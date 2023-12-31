import {
  MyToolTip,
  Scroll,
  INLINE_TEX_EDITOR_CLASSNAME,
  InlineMathDisplay,
  BLOCK_TEX_EDITOR_CLASSNAME,
  BlockMathDisplay,
  InlineTexEditor,
  BlockTexEditor,
  Quill,
} from "./MathBlots.js";
import { MATHJAXCOMMANDS } from "./mathjaxCommands";

const EDITOR_CONTAINER_FONTSIZE = "15px"; // QUILL'S EDITOR_CONTAINER FONT SIZE MUST BE KEPT IN SYNC WITH ACE'S EDITOR FONT SIZE, OTHERWISE TOOLTIP POSITIONING WILL BE OFF

function getACEEditorInstance(domNode) {
  //     TODO
  //
  var x = domNode;
  while (!x.env || !x.env.editor) {
    x = x.parentNode;
  }

  return x.env.editor;
}

// returns true if the given node is an inlineTexEdit blot; false otherwise.
function isInlineTexEditBlot(domNode) {
  //      ;
  try {
    let x = domNode;
    let blot = Quill.find(x);
    while (!(blot instanceof Scroll) && x.parentNode) {
      if (blot instanceof InlineTexEditor) return true;
      x = x.parentNode;
      blot = Quill.find(x);
      if (!x || !x.parentNode)
        throw {
          error: "x or x.parentNode is bad. ",
          x,
          parentNode: x.parentNode,
          blot,
        };
    }
    return false;
  } catch (e) {
    throw {
      caughtError: e,
    };
  }
}

// returns true if the given node is a blockTexEdit blot; false otherwise.
function isBlockTexEditBlot(domNode) {
  //     TODO
  //      ;
  try {
    let x = domNode;
    let blot = Quill.find(x);
    while (!(blot instanceof Scroll) && x.parentNode) {
      if (blot instanceof BlockTexEditor) return true;
      x = x.parentNode;
      blot = Quill.find(x);
      if (!x || !x.parentNode)
        throw {
          error: "x or x.parentNode is bad. ",
          x,
          parentNode: x.parentNode,
          blot,
        };
    }
    return false;
  } catch (e) {
    throw {
      caughtError: e,
    };
  }
}

class MathEditorModule {
  constructor(quill, options) {
    console.log("MathEditorModule constructor fired");

    // if (!options.hasOwnProperty('enterHandler')) {
    //     throw new Error('No enterHandler supplied. ')
    // }
    this.quill = quill;
    this.tooltip = new MyToolTip(quill);
    this.options = options;
    this.clicked = null; // a dom node
    this.clickedInlineTexEditor = false; // whether the domNode is an inline tex quillModules
    this.clickedBlockTexEditor = false;
    this.lastClickedIndex = null; //index of the last clicked item

    this.__setUpClickHandlerForConversionFromDisplayMathToEditMath();

    this.tooltip.root.classList.add("math-tooltip");
    this.setFontSize();
    window.quill = quill;
  }

  __setUpClickHandlerForConversionFromDisplayMathToEditMath() {
    let quill = this.quill;
    quill.root.addEventListener("click", (ev) => {
      //
      let clicked = ev.target,
        lastClicked = this.clicked;
      let isInlineTexEditor = isInlineTexEditBlot(clicked);
      let isBlockTexEditor = isBlockTexEditBlot(clicked); //todo
      if (!isInlineTexEditor && this.clickedInlineTexEditor) {
        // User is clicking away from an inline tex quillModules...
        //  ;
        let editor = getACEEditorInstance(lastClicked);
        let formula = editor.getValue();
        //  ;
        let begin = this.lastClickedIndex;
        let count = 1;
        // TODO refactor this ... omg so ugly
        quill.deleteText(begin, count, "silent");
        quill.insertEmbed(begin, "mathbox-inline", formula, Quill.sources.USER);
        this.tooltip.hide();
      } else if (!isBlockTexEditor && this.clickedBlockTexEditor) {
        // User is clicking away from a block tex quillModules...
        let editor = getACEEditorInstance(lastClicked);
        let formula = editor.getValue();
        //  ;
        let begin = this.lastClickedIndex;
        let count = 1;
        quill.deleteText(begin, count, "silent");
        quill.insertEmbed(begin, "mathbox-block", formula, Quill.sources.USER);
        this.tooltip.hide();
      }

      // update
      //    ;
      this.clicked = clicked;
      this.clickedInlineTexEditor = isInlineTexEditor;
      this.clickedBlockTexEditor = isBlockTexEditor;
      this.lastClickedIndex = quill.getSelection().index;
    });
  }

  setFontSize() {
    // document.getElementById("quillModules-container").style.fontSize = EDITOR_CONTAINER_FONTSIZE
  }

  // for inline ace quillModules auto resizing
  // numChars: number of characters. If undefined, use renderer.characterWidth
  updateSize(e, renderer, numChars) {
    //
    var text = renderer.session.getLine(0);
    var chars = renderer.session.$getStringScreenWidth(text)[0];

    var width =
      Math.max(chars, 2) * renderer.characterWidth + // text size
      2 * renderer.$padding + // padding
      2 + // little extra for the cursor
      0; // add border width if needed

    // update container size
    renderer.container.style.width = width + "px";
    // update computed size stored by the quillModules
    renderer.onResize(false, 0, width, renderer.$size.height);
  }

  /**
   * insert an ACE quillModules at the specified index of the quill instance.
   * @param index
   * @param latex the default text input to feed into the quillModules
   */
  insertBlockTexEditor(index, latex) {
    let _ = this,
      quill = _.quill;
    let res = quill.insertEmbed(
      index,
      BLOCK_TEX_EDITOR_CLASSNAME,
      true,
      Quill.sources.USER,
    );
    // =========== quillModules stuff
    let editor = this.configureACEEditor(
      document.getElementsByClassName(BLOCK_TEX_EDITOR_CLASSNAME)[0],
      latex,
    );
    setTimeout(function () {
      //  ;
      editor.focus();
      let index = quill.getSelection().index;
      _.action("setClick", { index, isInline: false });
    }, 0);
  }

  /**
   * @param index
   * @param latex
   */
  insertInlineTexEditor(index, latex) {
    //  ;
    let _ = this;
    let quill = this.quill;

    // ----------------------------------------------------------------------------
    let res = quill.insertEmbed(
      index,
      INLINE_TEX_EDITOR_CLASSNAME,
      latex,
      Quill.sources.USER,
    );

    this.configureACEEditor(window.node_wrappernode, latex, true);

    //  for some reason this must be done in order to avoid cursor being
    //  reset to the beginning of line. https://github.com/quilljs/quill/issues/731#issuecomment-326843147
    setTimeout(function () {
      //  ;
      window.editor.focus();
      let index = quill.getSelection().index;

      _.action("setClick", { index, isInline: true });
    }, 0);
  }

  action(type, param) {
    switch (type) {
      case "setClick":
        // TODO
        try {
          //  ;
          let quill = this.quill;
          let isInline = param.isInline;
          let index = param.index;
          let aceDomNode = quill
            .getLeaf(isInline ? index + 1 : index)[0]
            .domNode.getElementsByClassName("ace_content")[0];
          this.lastClickedIndex = index;
          this.clicked = aceDomNode;
          this.clickedInlineTexEditor = isInline;
          this.clickedBlockTexEditor = !isInline;
        } catch (e) {
          throw e;
        }
        break;
    }
  }

  /**
   * @param formula
   * @param isInline {Boolean}
   */
  configureACEEditor(node, formula = "", isInline = false) {
    let quill = this.quill;
    var editorNode = node;
    //
    var editor = window.ace.edit(editorNode);
    window.ace.require("ace/ext/language_tools");
    editor.setFontSize(EDITOR_CONTAINER_FONTSIZE); // todo refactor this
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/latex");
    editor.focus(); // Bug here. calling quillModules.focus resets quill selection index to 0.
    if (quill.getSelection().index === 0) console.trace();
    editor.setOptions({
      showGutter: !isInline,
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      maxLines: 40, //TODO change this as needed https://stackoverflow.com/questions/11584061/automatically-adjust-height-to-contents-in-ace-cloud-9-editor
    });
    editor.setFontSize(15); //TODO don't hardcode this...
    editor.renderer.updateCharacterSize();
    this.__set_up_editor_completer(editor);
    this.__set_editor_commands(editor, isInline);
    this.__set_up_live_preview(editor, isInline);
    editor.insert(formula);
    window.editor = editor;
    return editor;
  }

  __set_up_editor_completer(editor) {
    var staticWordCompleter = {
      getCompletions: function (editor, session, pos, prefix, callback) {
        // var wordList = [String.raw `\foo`, "bar", "baz"];
        var wordList = MATHJAXCOMMANDS;
        callback(
          null,
          wordList.map(function (word) {
            return {
              caption: word,
              value: word,
              meta: "static",
            };
          }),
        );
      },
    };

    editor.completers.push(staticWordCompleter);

    // make sure the auto complete pop up boxes are on top, instead of bottom
    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    };

    const callback = (mutationList, observer) => {
      //  ;
      for (const mutation of mutationList) {
        if (
          mutation.type === "childList" &&
          // /**/&&
          "addedNodes" in mutation &&
          mutation.addedNodes.length > 0 &&
          mutation.addedNodes[0].classList &&
          mutation.addedNodes[0].classList.contains("ace_autocomplete")
        ) {
          let auto = mutation.addedNodes[0];
          // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
          // this is to override ACE's styling choices for the autocomplete pop up box.
          const myObserver = new ResizeObserver((entries) => {
            // We wrap it in requestAnimationFrame to avoid this error - ResizeObserver loop limit exceeded
            // window.requestAnimationFrame(() => {
            entries.forEach((entry) => {
              console.log("width", entry.contentRect.width);
              console.log("height", entry.contentRect.height);
              let target = entry.target;
              // let height = entry.contentRect.height;
              let height = 100; // in pixels todo don't hard code this..
              if (height != 0) {
                //  ;
                let bounds = editor.container.getBoundingClientRect();
                target.style.top = bounds.y - 1.01 * height + "px";
                target.style.height = height + "px";
              }
            });
            // });
          });

          myObserver.observe(auto);
        }
      }
    };
    const observer = new MutationObserver(callback);

    observer.observe(document.body, config);
  }

  __set_editor_commands(editor, isInline) {
    let quill = this.quill,
      tooltip = this.tooltip;
    editor.commands.addCommand({
      name: "myCommand",
      bindKey: { win: "Ctrl-enter", mac: "Command-enter" },
      // TODO modify this for inline
      exec: this.getConvertEditorToMathHandler(isInline), //TODO refactor this to make sure this quill instance is the right one... especially when there is more than one quill quillModules in the page ...
      readOnly: true, // false if this command should not apply in readOnly mode
      // multiSelectAction: "forEach", optional way to control behavior with multiple cursors
      // scrollIntoView: "cursor", control how cursor is scolled into view after the command
    });

    //
    editor.commands.addCommand({
      name: "deleteMe",
      bindKey: { win: "backspace", mac: "backspace" },
      exec: function (editor) {
        //  ;
        let value = editor.getValue();
        console.log(value);
        if (value.length === 0) {
          // user wants to delete the quillModules box ...
          let index = quill.getSelection().index;
          quill.deleteText(index, 1);
          tooltip.hide();
        }

        return false; // must return false in order to fire the default event:https://stackoverflow.com/a/42020190/21646295
      },
    });

    let convertEditorToMath = this.getConvertEditorToMathHandler(isInline);
    if (!isInline) {
      editor.commands.addCommand({
        name: "exit me, down",
        bindKey: { win: "Down", mac: "Down" },
        exec: function (editor) {
          let cursorPosition = editor.selection.getCursor();
          let numLines = editor.session.getLength(); //number of lines
          if (cursorPosition.row === numLines - 1) {
            // user is pressing down arrow at the last line... so the user wants to exit

            //  ;
            convertEditorToMath(editor);
          }
          return false;
        },
      });
      editor.commands.addCommand({
        name: "exit me, up",
        bindKey: { win: "Up", mac: "Up" },
        exec: function (editor) {
          let cursorPosition = editor.selection.getCursor();
          let numLines = editor.session.getLength(); //number of lines
          if (cursorPosition.row === 0) {
            // user is pressing up arrow at the first line... so the user wants to exit

            //  ;
            convertEditorToMath(editor);
          }
          return false;
        },
      });
    } else {
      editor.commands.addCommand({
        name: "exit me, left",
        bindKey: { win: "Left", mac: "Left" },
        exec: function (editor) {
          let cursorPosition = editor.selection.getCursor();

          if (cursorPosition.column === 0) {
            //
            convertEditorToMath(editor);
          }
          return false;
        },
      });

      editor.commands.addCommand({
        name: "exit me, right",
        bindKey: { win: "Right", mac: "Right" },
        exec: function (editor) {
          let cursorPosition = editor.selection.getCursor();
          let len = editor.getValue().length;
          //
          if (cursorPosition.column === len) {
            convertEditorToMath(editor, "right");
          }
          return false;
        },
      });
    }
  }

  __set_up_live_preview(editor, isInline) {
    let tooltip = this.tooltip;
    let quill = this.quill;
    editor.session.on("change", (delta) => {
      let formula = editor.getValue();

      //    ;
      tooltip.show(); //todo refactor this

      if (!isInline) {
        tooltip.root.classList.add("fullwidth");
      }

      let bounds = quill.getBounds(
        // formula.length + quill.getSelection().index
        quill.getSelection().index, //todo for some reason selection has been set to 0. This is the bug
      );

      // TODO delete this because it's not used
      let inlineBounds = editor.container.getBoundingClientRect();
      //  ;
      //  ;
      formula = String.raw`
                    \displaylines{ ${formula} }
                `;

      //  ;
      tooltip.root.style.top = `${bounds.bottom}px`;
      // =============
      tooltip.root.style.left = `${isInline ? bounds.left : 0}px`;
      let typesetted = window.MathJax
        ? window.MathJax.tex2svg
          ? window.MathJax.tex2svg(formula)
          : ""
        : "";
      tooltip.root.innerHTML = `<span class="ql-tooltip-arrow"></span>${typesetted.outerHTML}`;

      if (isInline) {
        this.updateSize(null, editor.renderer);
        editor.focus();
      }
    });
  }

  getConvertEditorToMathHandler(isInline = false) {
    let _ = this;
    /**
     *
     * @param editor
     */
    /**
     * replace an quillModules block with a typesetted math displayer block by
     * deleting and then inserting. Also hides the tooltip.
     * @param editor
     * @param direction right, left, up, down
     */
    let f = (editor, direction) => {
      //
      let quill = _.quill;
      let tooltip = _.tooltip;
      // TODO get the right formula
      let formula = editor.getValue(); //todo
      console.log("hey! you wanna typeset the formula? ", formula);
      let indexOfEditor = quill.getSelection().index;
      //
      quill.deleteText(indexOfEditor, 1);
      quill.insertEmbed(
        indexOfEditor,
        isInline ? "mathbox-inline" : "mathbox-block",
        formula,
        "silent",
      );

      switch (direction) {
        case "right":
          quill.setSelection(indexOfEditor + 1);
          break;
        default:
          quill.setSelection(indexOfEditor);
      }

      tooltip.hide();
    };
    return f;
  }

  /**
   * @param blockMathNode
   * @param quill
   * @param attr
   */
  replaceBlockMathWithBlockEdit(blockMathNode, quill, attr) {
    let node = blockMathNode;
    let begin = quill.getIndex(node.__blot.blot);
    let formula = node.getAttribute("latex");
    //    ;
    this.insertBlockTexEditor(begin, formula);
    node.remove();
    let formulaHTML = window.MathJax.tex2svg(formula);
    this.tooltip.show();
    this.tooltip.root.innerHTML = `
                <span class="ql-tooltip-arrow"></span>
                ${formulaHTML.outerHTML}
            `;
  }

  /**
   * @param mathnode
   * @param quill
   */
  replaceInlineMathWithInlineEdit(mathnode, quill) {
    //TODO refactor this.. this function should take an index as attribute , that's it
    //  ;
    let node = mathnode;
    let begin = quill.getIndex(node.__blot.blot);
    let formula = node.getAttribute("latex");

    // TODO this wouldn't be an insert text. It should be an insertEmbed
    this.insertInlineTexEditor(begin, formula);
    node.remove();
    let formulaHTML = window.MathJax.tex2svg(formula);
    this.tooltip.show();

    this.tooltip.root.innerHTML = `
                <span class="ql-tooltip-arrow"></span>
                ${formulaHTML.outerHTML}
            `;
  }

  static getBindings() {
    // ;
    return {
      // https://quilljs.com/docs/modules/keyboard/
      startBlockMathEdit: {
        key: "Enter",
        handler: function (range, context) {
          // alert("hey!")
          let quill = this.quill;
          let math_editor_module = this.quill.getModule("MathEditorModule");
          if (!math_editor_module)
            throw new Error("No math quillModules module instance found. ");
          //
          let prefix = context.prefix;
          let lastTwo = prefix.slice(-2);
          let index = range.index;
          // ;
          let offset = context.offset;
          console.log(
            "Hey, you pressed enter. ",
            range,
            context,
            lastTwo,
            quill.getLine(index),
          );

          if (lastTwo === "$$") {
            if (offset === 2) {
              quill.deleteText(index - 2, 2);
              math_editor_module.insertBlockTexEditor(index - 2, "");
            } else {
              // alert("hey! no!")
              quill.deleteText(index - 2, 2);
              index = index - 2;
              quill.insertText(index, `\n`);
              math_editor_module.insertBlockTexEditor(index + 1, "");
            }
            return false;
          }
          return true;
          // return false
        },
      },

      dollarSign: {
        key: 52,
        shiftKey: true,
        handler: function (range, context) {
          console.log("hey! dollar sign pressed");
          //
          let quill = this.quill;
          let math_editor_module = this.quill.getModule("MathEditorModule");
          if (!math_editor_module)
            throw new Error("No math quillModules module instance found. ");
          let index = quill.getSelection().index;
          quill.insertText(index, "$$");
          quill.setSelection(index + 1);

          quill.once("text-change", (delta, oldDelta, source) => {
            console.log("hey!");
            console.log(delta, oldDelta, source);
            //
            let ops1 = delta.ops[1]; // todo change this name...

            if (ops1.hasOwnProperty("insert")) {
              let formula = ops1.insert;
              // alert("hey! you wanna edit latex?")

              //  ;
              quill.deleteText(index, 3);
              //
              math_editor_module.insertInlineTexEditor(index, formula);
            } else if (ops1.hasOwnProperty("delete")) {
              console.log("hey! you dont wanna edit latex anymore?");
              quill.deleteText(index, 1);
            }
          });
        },
      },
      // https://github.com/quilljs/quill/issues/2005#issuecomment-1094329026

      "embed left": {
        key: 37,
        handler: function (range, context) {
          //     ;
          let quill = this.quill;
          let index = range.index;

          let blot = quill.getLeaf(index)[0];

          let mathEditorModule = quill.getModule("MathEditorModule");
          if (blot instanceof InlineMathDisplay) {
            //     ;
            mathEditorModule.replaceInlineMathWithInlineEdit(
              blot.domNode,
              quill,
            );
          }
          return true;
        },
      },
      //
      "embed right": {
        key: 39,
        handler: function (range, context) {
          //     ;
          let quill = this.quill;
          let index = range.index + 1;
          let blot = quill.getLeaf(index)[0];

          let mathEditorModule = quill.getModule("MathEditorModule");
          if (blot instanceof InlineMathDisplay) {
            mathEditorModule.replaceInlineMathWithInlineEdit(
              blot.domNode,
              quill,
            );
          }

          return true;
        },
      },
    };
  }
}

Quill.register("modules/MathEditorModule", MathEditorModule);

export { MathEditorModule, Quill };
