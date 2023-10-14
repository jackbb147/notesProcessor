import { useEffect } from "react";
import {
  $getSelection,
  $isNodeSelection,
  $isRangeSelection,
  LexicalEditor,
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

function useInlineMath(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform1 = editor.registerNodeTransform(TextNode, (node) => {
      textNodeTransform(node);
    });

    const removeTransform2 = editor.registerNodeTransform(
      InlineMathNode,
      (node) => {
        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;
          // debugger;
          node.setSelection(selection);
          // debugger;
        });
      },
    );

    const removeMutationListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editor.update(() => {
          // ...
          const selection = $getSelection();
          if ($isNodeSelection(selection)) {
            const nodes = selection.getNodes();
            if (nodes.length > 1 && !$isInlineMathNode(nodes[0])) return;
            let node: InlineMathNode = nodes[0] as InlineMathNode;
            if (node.getShowToolTip()) return;
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
}
export function InlineMathPlugin() {
  const [editor] = useLexicalComposerContext();
  useInlineMath(editor);
  return null;
}
