import { Node } from "@tiptap/core";
import { nodeInputRule } from "@tiptap/core";
const inputRegex = /(?:^|\s)((?:~)((?:[^~]+))(?:~))$/;

export const CustomNode = Node.create({
  name: "customNode",

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
      // Backspace: ({ editor }) => {
      //   // TODO if user press delete when his cursor is between two $$, then delete the two $$
      //   var cursorPos = editor.state.selection.$anchor.pos;
      //   var text = editor.state.doc.textBetween(cursorPos - 1, cursorPos + 1);
      //   if (text === "$$") {
      //     // alert("backspace ");
      //     debugger;
      //   } else {
      //     // //
      //     console.debug("backspace: ", cursorPos);
      //     editor.commands.deleteRange({
      //       from: cursorPos - 1,
      //       to: cursorPos,
      //     });
      //     editor.commands.setTextSelection(cursorPos - 1);
      //   }
      //   // editor.chain().run();
      //   return true;
      // },
    };
  },

  // Your code goes here.
  // addInputRules() {
  //   return [
  //     nodeInputRule({
  //       find: inputRegex,
  //       type: this.type,
  //     }),
  //   ];
  // },
});
