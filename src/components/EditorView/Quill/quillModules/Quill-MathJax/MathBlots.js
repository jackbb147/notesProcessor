import sheet from "./MathBlots.css";
import sheet2 from "./styles.css";
// import 'react-quill/dist/quill.snow.css';
// import  bubbleCSS from 'react-quill/dist/quill.bubble.css';
import bubbleCSS from "./bubble.css";
// assert { type: 'css' };
// document.adoptedStyleSheets = [sheet];
import { Quill } from "react-quill";

const FORMAT_BLOCKTEXEDIT = "blockwrapper";
const BLOCK_TEX_EDITOR_CLASSNAME = "blocktexeditor"; //todo change this variable name
const INLINE_TEX_EDITOR_CLASSNAME = "inlinetexeditor";
const Scroll = Quill.import("blots/scroll");

/**
 * How to use:
 *
 * Quill.register(Block)
 * Quill.register(BlockMathDisplay)
 * Quill.register(InlineMathDisplay);
 * Quill.register('modules/MathEditorModule', MathEditorModule)
 * let enterHandler = new EnterHandlerClass();
 * let quill = new Quill('#quillModules-container', {
 *     theme: "bubble",
 *     modules:{
 *         MathEditorModule: {
 *             enterHandler
 *         },
 *         keyboard:
 *             {
 *             bindings: enterHandler.getBindings()
 *         }
 *     }
 * });
 */
let Inline = Quill.import("blots/inline");
let Block = Quill.import("blots/block");
let BlockEmbed = Quill.import("blots/block/embed");
let InlineEmbed = Quill.import("blots/embed");
const Tooltip = Quill.import("ui/tooltip");

function findQuill(node) {
  while (node) {
    const quill = Quill.find(node);
    if (quill instanceof Quill) return quill;
    node = node.parentElement;
  }
}
// https://stackoverflow.com/a/62778691
/**
 * Displays typesetted math symbols, like "F = ma"
 * @param Base
 * @return {{value(*): *, create(*, boolean=): *, new(): {}, prototype: {}}}
 * @constructor
 */
let MathDisplayBlot = (Base) =>
  class extends Base {
    static create(latex, isInline = false) {
      let node = super.create();
      node.ContentEditable = "false";
      node.setAttribute("latex", latex);

      var mjx = window.MathJax.tex2svg(latex);
      node.innerHTML = mjx.outerHTML;
      window.node = node;
      if (isInline) node.style.display = "inline";

      return node;
    }

    static value(domNode) {
      //     TODO

      return domNode.getAttribute("latex");
    }
  };

class BlockMathDisplay extends MathDisplayBlot(BlockEmbed) {
  static tagName = "div";
  static className = "mathbox-block";
  static blotName = "mathbox-block";

  static create(latex) {
    //TODO
    let node = super.create(latex);
    //
    node.addEventListener("mousedown", (e) => {
      //     ;
      // quill.
    });
    node.addEventListener(
      "mouseup",
      BlockMathDisplay.MouseUpHandler(node, {
        "code-block": true, // todo get rid of this 'code-block'
      }),
    );
    return node;
  }

  /**
   * convert a mathjax block into a tex edit block.
   * @param node
   * @param attr {'code-block': true} or {'inlinetex': true}
   * @returns {(function(*): void)|*}
   * @constructor
   */
  static MouseUpHandler(node, attr) {
    // TODO find the math quillModules module instance
    return (e) => {
      let math_editor_module = findQuill(node).getModule("MathEditorModule");
      //     ;
      math_editor_module.replaceBlockMathWithBlockEdit(
        node,
        window.quill,
        attr,
      );
    };
  }
}

class InlineMathDisplay extends MathDisplayBlot(InlineEmbed) {
  // supposed to be inline ..., not blockEmbed...
  static blotName = "mathbox-inline";
  static tagName = "span";
  static className = "mathbox-inline";

  static create(latex) {
    let node = super.create(latex, true);
    let mathNode = node.firstChild;
    mathNode.removeAttribute("display");
    mathNode.style["math-style"] = "normal";
    node.addEventListener(
      "mouseup",
      // TODO find the math quillModules module instance
      () => {
        let math_editor_module = findQuill(node).getModule("MathEditorModule");
        math_editor_module.replaceInlineMathWithInlineEdit(node, window.quill);
      },
    );

    node.addEventListener("keydown", (e) => {});
    return node;
  }
}

class MyToolTip extends Tooltip {
  // This is the innerHTML of the tooltip
  // https://stackoverflow.com/questions/41131547/building-custom-quill-editor-theme
  static TEMPLATE = `
<!--<span>hello</span>-->
<div class="ql-tooltip-arrow"></div>

<span>A template: ${(() => {
    //     ;
    if (window.MathJax && window.MathJax.tex2svg)
      return window.MathJax.tex2svg("\\int \\mathcal{E}").outerHTML;
  })()}</span>
`;

  constructor(quill, bounds) {
    super(quill, bounds);
  }
}

class InlineTexEditor extends InlineEmbed {
  static blotName = INLINE_TEX_EDITOR_CLASSNAME;
  static className = INLINE_TEX_EDITOR_CLASSNAME;
  static tagName = "div";

  static create(value = "") {
    //  ;
    let node = super.create();
    var node_wrappernode = document.createElement("div");

    node_wrappernode.classList.add("inline-quillModules-wrapper");
    node.appendChild(node_wrappernode);

    node.setAttribute("latex", value);
    node.setAttribute("isInlineTexEditor", true);
    node.style.display = "inline"; // todo moe this to a css file

    node_wrappernode.style.display = "inline-block";
    node_wrappernode.style["vertical-align"] = "middle";
    node_wrappernode.style.width = "1px"; // default width

    window.node_wrappernode = node_wrappernode;

    return node;
  }

  static value(node) {
    return node.getAttribute("latex");
  }
}

class BlockTexEditor extends BlockEmbed {
  static blotName = BLOCK_TEX_EDITOR_CLASSNAME;
  static tagName = "div";
  static className = BLOCK_TEX_EDITOR_CLASSNAME;

  // constructor() {
  //     super();
  // }

  /**
   *
   * @param value{String} latex source code
   * @returns {*}
   */
  static create(value = "") {
    let node = super.create();
    // TODO
    node.setAttribute("latex", value);
    node.setAttribute("isBlockTexEditor", true);
    return node;
  }

  static value(node) {
    return node.getAttribute("latex");
  }

  // This method hooks up the keybindings to this embed.
  formats() {
    let res = {};
    res[FORMAT_BLOCKTEXEDIT] = true;
    return res;
  }

  // format(name, value){
  //      ;
  //
  // }
}

class BlockWrapper extends Block {
  static blotName = "blockwrapper";
  static tagName = "div";
  static className = "blockwrapper";
}

Quill.register(Block);
Quill.register(BlockMathDisplay);
Quill.register(BlockTexEditor);
Quill.register(InlineTexEditor);
Quill.register(BlockWrapper);
Quill.register(InlineMathDisplay);

export {
  MyToolTip,
  Scroll,
  INLINE_TEX_EDITOR_CLASSNAME,
  InlineMathDisplay,
  BLOCK_TEX_EDITOR_CLASSNAME,
  BlockMathDisplay,
  InlineTexEditor,
  BlockTexEditor,
  Quill,
};
