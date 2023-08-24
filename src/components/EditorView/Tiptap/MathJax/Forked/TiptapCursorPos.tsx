import { Editor } from "@tiptap/core";

export function getCursorPos(tiptapEditor: Editor | any) {
  const selection = tiptapEditor.state.selection;
  const cursorPos = selection.$anchor.pos;
  return cursorPos;
}

export function setCursorPos(tiptapEditor: Editor | any, pos: number) {
  // @ts-ignore
  tiptapEditor.commands.focus(pos);
  // tiptapEditor.chain().focus().setTextSelection(pos).run();
}
