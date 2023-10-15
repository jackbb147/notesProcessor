import { Pi } from "lucide-react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { IconSize } from "./IconSize";
import {
  $createParagraphNode,
  $createTextNode,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
  LexicalEditor,
  ParagraphNode,
} from "lexical";

import { useEffect } from "react";
import {
  $createInlineMathNode,
  InlineMathNode,
} from "../../Lexical/Math/InlineMathNode";
import {
  $insertNodeToNearestRoot,
  $wrapNodeInElement,
  $getNearestNodeOfType,
  $getNearestBlockElementAncestorOrThrow,
  $insertFirst,
} from "@lexical/utils";

import { $getSelection } from "lexical";

export const INSERT_INLINE_MATH_COMMAND: LexicalCommand<string> =
  createCommand();
export function MathBtn({ editor }: { editor: LexicalEditor | null }) {
  function handleClick() {
    if (!editor) return;
    // TODO - insert math
    editor.dispatchCommand(INSERT_INLINE_MATH_COMMAND, "");
    // editor
    //   .chain()
    //   .focus()
    //   .insertContent(`<react-component>\vec{F} = m\vec{a}</react-component>`)
    //   .run();
  }
  useEffect(() => {
    if (!editor) return;
    if (!editor.hasNodes([InlineMathNode])) {
      throw new Error(
        "[InlineMathPlugin]: InlineMathNode not registered on editor (initialConfig.nodes)",
      );
    }

    return editor.registerCommand<string>(
      INSERT_INLINE_MATH_COMMAND,
      (payload) => {
        /**
         * https://github.com/facebook/lexical/discussions/2047
         */
        const selection = $getSelection();
        const node = selection?.getNodes()[0];

        const inlineMathNode = $createInlineMathNode(payload, true);
        const emptyTextNode = $createTextNode("empty");

        if (node) {
          const parent = $getNearestBlockElementAncestorOrThrow(node);

          parent.append(inlineMathNode);
          // parent.append(emptyTextNode);
          // emptyTextNode.select();
        }

        return true;
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);
  return (
    <MenuItem
      value={"math"}
      ariaLabel={"Math"}
      isActive={false}
      onClick={handleClick}
    >
      <Pi size={IconSize} />
    </MenuItem>
  );
}
