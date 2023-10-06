import { Pi } from "lucide-react";
import { Editor } from "@tiptap/core";
import { MenuItem } from "./MenuItem";
import { IconSize } from "./IconSize";
import { COMMAND_PRIORITY_EDITOR, LexicalEditor } from "lexical";
import { INSERT_INLINE_MATH_COMMAND } from "../../Lexical/Editor";
import { useEffect } from "react";
import {
  $createInlineMathNode,
  InlineMathNode,
} from "../../Lexical/Math/InlineMathNode";
import { $insertNodeToNearestRoot } from "@lexical/utils";

export function MathBtn({ editor }: { editor: LexicalEditor | null }) {
  function handleClick() {
    if (!editor) return;
    // TODO - insert math
    editor.dispatchCommand(INSERT_INLINE_MATH_COMMAND, "test");
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
        const inlineMathNode = $createInlineMathNode(payload);
        $insertNodeToNearestRoot(inlineMathNode);

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
