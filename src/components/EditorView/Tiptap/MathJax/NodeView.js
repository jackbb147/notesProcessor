import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

import "./NodeViewStyles.css";
import { EditorView } from "@tiptap/pm/view";

const CustomExtension = Extension.create({
  name: "custom",
});

const NAME = "nodeView";

export default Node.create({
  name: NAME,
  // group: "inline*",
  group: "block",

  content: "inline*",

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

  // addOptions() {},

  parseHTML() {
    return [
      {
        tag: "node-view",
      },
    ];
  },

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
                  type: NAME,
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

  renderHTML({ HTMLAttributes }) {
    return ["node-view", mergeAttributes(HTMLAttributes), 0];
  },

  addInputRules() {
    const inputRegex = /abc/;
    // const inputRegex = /./gm;
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addNodeView() {
    return () => {
      // Markup
      /*
              <div class="node-view">
                <span class="label">Node view</span>

                <div class="content"></div>
              </div>
            */

      const dom = document.createElement("div");

      dom.classList.add("node-view");

      const label = document.createElement("span");

      label.classList.add("label");
      label.innerHTML = "Node view";
      label.contentEditable = false;

      const content = document.createElement("div");

      content.classList.add("content");

      dom.append(label, content);

      return {
        dom,
        contentDOM: content,
      };
    };
  },
});
