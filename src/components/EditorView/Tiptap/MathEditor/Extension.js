import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { PluginKey, Plugin } from "@tiptap/pm/state";

import { InlineMathEditorComponent } from "./InlineMathEditorComponent.tsx";
export default Node.create({
  name: "reactComponent",

  group: "inline",
  inline: true,
  atom: false,
  selectable: false,

  defining: true,

  addProseMirrorPlugins() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleKeyDown: (view, e) => {
            // TODO move this to NodeView.js
            const cursorPos = view.state.selection.$anchor.pos;
            const text = view.state.doc.textBetween(
              cursorPos - 1,
              cursorPos + 1,
            );

            if (text === "$$") {
              if (e.key === "Backspace") {
                //
                e.preventDefault();

                view.dispatch(
                  view.state.tr.delete(cursorPos - 1, cursorPos + 1),
                );
                return true;

                // e.stopPropagation();
              }
            }
            // console.debug(
            //   `[handleKeyDown] ${JSON.stringify(view, null, 2)}, ${JSON.stringify(
            //     e,
            //     null,
            //     2,
            //   )}`,
            // );
          },
          handleTextInput(view, from, to, textInput) {
            try {
              //
              const editorInstance = that.editor;

              const cursorPos = view.state.selection.$anchor.pos;
              const text = view.state.doc.textBetween(
                cursorPos - 1,
                cursorPos + 1,
              );

              if (text === "$$") {
                //
                // TODO: insert a node
                // editorInstance.commands.insertContentAt(cursorPos, "nihao");
                editorInstance.commands.deleteRange({
                  from: cursorPos - 1,
                  to: cursorPos + 1,
                });
                editorInstance.commands.insertContentAt(
                  cursorPos - 1,
                  // "hello wolrd",
                  {
                    type: "reactComponent",
                    attrs: {
                      first: true,
                    },
                  },
                );
                // TODO somehow open the tooltip upon inserting the node
                //

                return true; // this is to prevent the default behavior of inserting the text: https://prosemirror.net/docs/ref/
              }
            } catch (e) {
              console.error(e);
            }
          },
        },
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      $: ({ editor }) => {
        editor.commands.insertContent("$$");
        const selection = editor.state.selection;
        const cursorPos = selection.$anchor.pos;
        editor.commands.setTextSelection(cursorPos - 1);
        //
        return true;
      },
    };
  },

  addAttributes() {
    return {
      count: {
        default: 0,
      },
      value: {
        default: String.raw`\small{\textit{long press to edit:}} \; \hat{H} \ket{\psi} = E\ket{\psi} `,
      },
      open: {
        default: false,
      },
      first: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["react-component", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineMathEditorComponent);
  },
});
