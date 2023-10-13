import { useEffect } from "react";
import {
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  TextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createInlineMathNode, InlineMathNode } from "./InlineMathNode";

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
          debugger;
          node.setSelection(selection);
          // debugger;
        });
      },
    );
    return () => {
      removeTransform1();
      removeTransform2();
    };
  }, [editor]);
}
export function InlineMathPlugin() {
  const [editor] = useLexicalComposerContext();
  useInlineMath(editor);
  return null;
}
