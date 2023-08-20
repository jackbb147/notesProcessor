import { Node } from "@tiptap/core";
import { nodeInputRule } from "@tiptap/core";
import NodeView from "./NodeView";
const inputRegex = /(?:^|\s)((?:~)((?:[^~]+))(?:~))$/;
export const CustomNode = Node.create({
  name: "customNode",

  priority: 1000,
  addKeyboardShortcuts() {
    return {
      $: ({ editor }) => {
        editor.commands.insertContent("$$");
        const selection = editor.state.selection;
        const cursorPos = selection.$anchor.pos;
        editor.commands.setTextSelection(cursorPos - 1);
        // debugger;
        return true;
      },
    };
  },

  // Your code goes here.
  // addInputRules() {
  //   return [
  //     nodeInputRule({
  //       find: inputRegex,
  //       type: NodeView.type,
  //     }),
  //   ];
  // },
});
