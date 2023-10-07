import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot, $insertNodes } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
export function HTMLToLexicalPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      // html = String.raw`<p>wendy</p>`;
      // html = String.raw`<p><h1>wendy</h1></p>`; // error
      html = String.raw`<h1>wendy</h1>`;
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      console.log("nodes: ", nodes);
      // Select the root
      const root = $getRoot();
      root.clear();
      root.select();

      // Insert them at a selection.
      $insertNodes(nodes);
    });
  }, [html]);
  return null;
}
