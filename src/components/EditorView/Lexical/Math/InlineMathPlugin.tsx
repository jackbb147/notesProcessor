import { useEffect } from "react";
import { LexicalEditor, TextNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function useInlineMath(editor: LexicalEditor) {
  useEffect(() => {
    const removeTransform = editor.registerNodeTransform(TextNode, (node) => {
      // console.log("hello: " + node.getTextContent());
      const textContent = node.getTextContent();
      if (/\$.\$/.test(textContent)) {
        //     TODO
        console.log("found inline math");
      }
    });
    return () => {
      removeTransform();
    };
  }, [editor]);
}
export function InlineMathPlugin() {
  const [editor] = useLexicalComposerContext();
  useInlineMath(editor);
  return null;
}
