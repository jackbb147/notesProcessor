import { mergeAttributes, Node } from "@jackhou147/tiptap/packages/core";
import { ReactNodeViewRenderer } from "@jackhou147/tiptap/packages/react";
import { Plugin, PluginKey } from "@jackhou147/tiptap/packages/pm/state";

import { InlineMathEditorComponent } from "./InlineMathEditorComponent.tsx";
import { getCursorPos, setCursorPos } from "./TiptapCursorPos";

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
                // debugger;
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
              // debugger;
              const editorInstance = that.editor;

              const cursorPos = view.state.selection.$anchor.pos;
              const text = view.state.doc.textBetween(
                cursorPos - 1,
                cursorPos + 1,
              );

              if (text === "$$") {
                // debugger;
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
                  },
                );
                // debugger;

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
        // debugger;
        return true;
      },
    };
  },

  addAttributes() {
    return {
      count: {
        default: 0,
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
