import { useEffect, useRef, useState } from "react";
import {
  $createNodeSelection,
  $createRangeSelection,
  $createTextNode,
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $setSelection,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  DEPRECATED_$isGridSelection,
  GridSelection,
  LexicalCommand,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  TextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createInlineMathNode,
  $isInlineMathNode,
  InlineMathNode,
} from "./InlineMathNode";
import { SAVE_COMMAND } from "../HandleSaveNotePlugin";

function textNodeTransform(node: TextNode): void {
  let targetNode: InlineMathNode | null = findAndTransformInlineMath(node);
}

function findAndTransformInlineMath(node: TextNode): InlineMathNode | null {
  const textContent = node.getTextContent();

  for (var i = 0; i < textContent.length; i++) {
    const chunk = textContent.slice(i, i + 3);
    if (/\$.\$/.test(chunk)) {
      // debugger;
      let targetNode;
      console.log("found inline math: " + chunk);
      // debugger;
      if (i == 0) {
        [targetNode] = node.splitText(i + 3);
      } else {
        [, targetNode] = node.splitText(i, i + 3);
      }
      // debugger;
      console.log("targetNode: " + targetNode.getTextContent());
      const inlineMathNode = $createInlineMathNode(chunk[1], true);
      //  =================
      const testTextNode = $createTextNode("");
      // targetNode.replace(testTextNode);
      //  =================
      targetNode.replace(inlineMathNode);
      const selection = $createNodeSelection();
      // selection.add(testTextNode.getKey());
      selection.add(inlineMathNode.getKey());
      // selection.add(key);
      $setSelection(selection);
      return inlineMathNode;
    }
  }

  return null;
}

export const ENTER_COMMAND: LexicalCommand<string> = createCommand();
export function InlineMathPlugin() {
  const [editor] = useLexicalComposerContext();
  // const [lastSelection, setLastSelection] = useState<any>(null);
  const lastSelection = useRef<
    RangeSelection | NodeSelection | GridSelection | null
  >(null);
  useEffect(() => {
    const removeCommand = editor.registerCommand(
      ENTER_COMMAND,
      (payload, editor): boolean => {
        editor.update(() => {
          const selection = $getSelection();
          const nodes = selection?.getNodes();
          if (!nodes || nodes.length !== 1 || !$isInlineMathNode(nodes[0]))
            return false;
          // debugger;
          const node = nodes[0] as InlineMathNode;
          // debugger;
          node.setShowToolTip(true);
        });
        return true;
      },
      COMMAND_PRIORITY_HIGH,
    );

    const removeUpdateListender = editor.registerUpdateListener(
      ({ editorState, dirtyElements, prevEditorState }) => {
        editor.update(() => {
          const selection = $getSelection();
          // if (!selection) debugger;

          if ($isNodeSelection(selection)) {
            const nodes = selection.getNodes();
            if (nodes.length > 1 && !$isInlineMathNode(nodes[0])) return;
            let node: InlineMathNode = nodes[0] as InlineMathNode;
            if (node.getSelected()) {
              console.log("already selected");
              return;
            }
            node.setSelected(true);
            return;
          } else {
            const prevSelection = prevEditorState._selection;
            if ($isNodeSelection(prevSelection)) {
              // debugger;
              const nodeKeys = Array.from(prevSelection._nodes);
              const previousNodes = nodeKeys.map((key) =>
                prevEditorState._nodeMap.get(key),
              );
              if (
                previousNodes.length > 1 &&
                !$isInlineMathNode(previousNodes[0])
              )
                return;
              // debugger;
              let previousNode: InlineMathNode =
                previousNodes[0] as InlineMathNode;
              let currentNode = $getNodeByKey(previousNode.getKey());
              // debugger;
              if (previousNode.__selected) {
                currentNode?.setSelected(false);
              }
              //
              // if (node.getSelected()) {
              //   node = $getNodeByKey(key) as InlineMathNode;
              //   node.setSelected(false);
              // }
            }
          }
          if (DEPRECATED_$isGridSelection(selection) || !selection) {
            return;
          }
          console.log("SETTING LAST SELECTION");
          console.dir(selection);
          lastSelection.current = selection;
        });
      },
    );

    const removeTransform1 = editor.registerNodeTransform(TextNode, (node) => {
      textNodeTransform(node);
    });

    const removeTransform2 = editor.registerNodeTransform(
      InlineMathNode,
      (node) => {
        editor.update(() => {
          const exitDirection = node.getExitDirection();
          if (!exitDirection) return; // this is to prevent bug.
          if (node.getShowToolTip()) {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;
            // debugger;
            console.assert(selection);
            if (!selection) debugger;
            node.setSelection(selection);
          } else {
            //   TODO set selection
            console.assert(lastSelection.current);
            // if (
            //   !lastSelection.current &&
            //   !$isRangeSelection(lastSelection.current)
            // )
            //   debugger;
            const lastS = lastSelection.current;
            console.assert($isRangeSelection(lastS));
            console.log("[NodeTransform] about to set selection to: ");
            console.dir(lastS);

            console.log(
              "[NodeTransform] inline math node exit direction:  " +
                node.getExitDirection(),
            );

            console.dir(node);
            // debugger;
            if (!node.__selected) {
              const existDirection = node.getExitDirection();
              if (!existDirection) $setSelection(lastS?.clone() ?? null);
              else if (existDirection === "left") {
                //   TODO
                //   set selection to be the left of the inline math node
                const prevNode = node.getPreviousSibling();
                // debugger;
                node.selectPrevious();
              } else if (existDirection === "right") {
                //   TODO
                const nextNode = node.getNextSibling();
                console.log("nextNode: ");
                console.dir(nextNode);
                if (!nextNode) {
                  const emptyTextNode = $createTextNode(" ");
                  const parent = node.getParent();
                  if (!parent) debugger;
                  parent?.append(emptyTextNode);
                  emptyTextNode.select(0, 0);
                } else node.selectNext(0, 0);
                //   set selection to be the right of the inline math node
              }
            }
            // $setSelection($createRangeSelection());
            // $setSelection(lastSelection.current?.clone() ?? null);
          }

          // debugger;
        });
      },
    );

    // editor.registerNodeTransform(InlineMathNode, (node) => {
    //   editor.update(() => {
    //     debugger;
    //     const selection = $getSelection();
    //     if (!$isNodeSelection(selection)) return;
    //     const nodes = selection.getNodes();
    //     if (nodes.length > 1 && !$isInlineMathNode(nodes[0])) return;
    //     let node: InlineMathNode = nodes[0] as InlineMathNode;
    //     if (node.getShowToolTip()) return;
    //     console.warn("showing tooltip");
    //     node.setShowToolTip(true);
    //   });
    // });
    // const removeMutationListener = editor.registerUpdateListener(
    //   ({ editorState, dirtyElements, prevEditorState }) => {
    //     editor.update(() => {
    //       // ...
    //       const d = dirtyElements;
    //       const p = prevEditorState;
    //
    //       const selection = $getSelection();
    //       if ($isNodeSelection(selection)) {
    //         // debugger;
    //
    //         const nodes = selection.getNodes();
    //
    //         // debugger;
    //         if (nodes.length > 1 && !$isInlineMathNode(nodes[0])) return;
    //         let node: InlineMathNode = nodes[0] as InlineMathNode;
    //         if (
    //           ($isNodeSelection(p._selection) && !node.getShowToolTip()) ||
    //           node.getShowToolTip()
    //         )
    //           return;
    //         // debugger;
    //         console.warn("showing tooltip");
    //         node.setShowToolTip(true);
    //       }
    //     });
    //   },
    // );
    return () => {
      removeCommand();
      removeUpdateListender();
      removeTransform1();
      removeTransform2();
      // removeMutationListener();
    };
  }, [editor]);
  return null;
}
