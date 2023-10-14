import { useEffect, useRef, useState } from "react";
import {
  $createRangeSelection,
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  $setSelection,
  DEPRECATED_$isGridSelection,
  GridSelection,
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
      if (i == 0) {
        [targetNode] = node.splitText(i + 3);
      } else {
        [, targetNode] = node.splitText(i, i + 3);
      }
      // debugger;
      console.log("targetNode: " + targetNode.getTextContent());
      const inlineMathNode = $createInlineMathNode(chunk[1], true);
      targetNode.replace(inlineMathNode);
      return inlineMathNode;
    }
  }

  return null;
}

export function InlineMathPlugin() {
  const [editor] = useLexicalComposerContext();
  // const [lastSelection, setLastSelection] = useState<any>(null);
  const lastSelection = useRef<
    RangeSelection | NodeSelection | GridSelection | null
  >(null);
  useEffect(() => {
    editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if (!selection) debugger;
        console.log("SETTING SELECTION");
        if (
          $isNodeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          return;
        }
        console.dir(selection);
        lastSelection.current = selection;
      });
    });

    const removeTransform1 = editor.registerNodeTransform(TextNode, (node) => {
      textNodeTransform(node);
    });

    const removeTransform2 = editor.registerNodeTransform(
      InlineMathNode,
      (node) => {
        editor.update(() => {
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
            if (
              !lastSelection.current &&
              !$isRangeSelection(lastSelection.current)
            )
              debugger;
            const lastS = lastSelection.current;
            if ($isNodeSelection(lastS)) {
              debugger;
            }
            console.dir(lastS);
            $setSelection(lastS?.clone() ?? null);
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
    const removeMutationListener = editor.registerUpdateListener(
      ({ editorState, dirtyElements, prevEditorState }) => {
        editor.update(() => {
          // ...
          const d = dirtyElements;
          const p = prevEditorState;

          const selection = $getSelection();
          if ($isNodeSelection(selection)) {
            // debugger;

            const nodes = selection.getNodes();

            // debugger;
            if (nodes.length > 1 && !$isInlineMathNode(nodes[0])) return;
            let node: InlineMathNode = nodes[0] as InlineMathNode;
            if (
              ($isNodeSelection(p._selection) && !node.getShowToolTip()) ||
              node.getShowToolTip()
            )
              return;
            // debugger;
            console.warn("showing tooltip");
            node.setShowToolTip(true);
          }
        });
      },
    );
    return () => {
      removeTransform1();
      removeTransform2();
      removeMutationListener();
    };
  }, [editor]);
  return null;
}
