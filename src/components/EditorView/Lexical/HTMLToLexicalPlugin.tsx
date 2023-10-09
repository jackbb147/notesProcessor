import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot, $insertNodes, $setSelection } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { $createRangeSelection } from "lexical";

export function HTMLToLexicalPlugin({ html }: { html: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.update(() => {
      const parser = new DOMParser();
      // html = String.raw`<p>wendy</p>`;
      // html = String.raw`<p><span>Wendy</span> <span class="InlineMathNode">F = m\vec{a}</span></p>`; // error
      // html = String.raw`<!--<ol><li>number 1</li></ol>-->`;
      const dom = parser.parseFromString(html, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      console.log("nodes: ", nodes);
      // Select the root
      const root = $getRoot();
      root.clear();
      root.select();

      // Insert them at a selection.
      $insertNodes(nodes);

      $setSelection(null); // this is to prevent the selection from being at the end of the document after inserting the nodes
    });
  }, [html]);
  return null;
}
