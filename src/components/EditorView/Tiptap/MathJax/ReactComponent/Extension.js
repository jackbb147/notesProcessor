import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import Component from "./Component.jsx";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export default Node.create({
  name: "reactComponent",

  group: "block",

  atom: true,

  addProseMirrorPlugins() {
    var that = this;
    return [
      new Plugin({
        key: new PluginKey("eventHandler"),
        props: {
          handleKeyDown: (view, e) => {
            //TODO move this to NodeView.js
            var cursorPos = view.state.selection.$anchor.pos;
            var text = view.state.doc.textBetween(cursorPos - 1, cursorPos + 1);
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
              var editorInstance = that.editor;

              var cursorPos = view.state.selection.$anchor.pos;
              var text = view.state.doc.textBetween(
                cursorPos - 1,
                cursorPos + 1,
              );
              if (text == "$$") {
                // debugger;
                // TODO: insert a node
                // editorInstance.commands.insertContentAt(cursorPos, "nihao");
                editorInstance.commands.deleteRange({
                  from: cursorPos - 1,
                  to: cursorPos + 1,
                });
                editorInstance.commands.insertContentAt(cursorPos, {
                  type: "reactComponent",
                });
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
    return ReactNodeViewRenderer(Component);
  },
});
