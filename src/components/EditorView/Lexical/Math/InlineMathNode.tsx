import {
  $createRangeSelection,
  $getNodeByKey,
  $getPreviousSelection,
  $getSelection,
  $isRangeSelection,
  $setSelection,
  DecoratorNode,
  DOMConversionMap,
  DOMExportOutput,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  RangeSelection,
  SerializedElementNode,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import React, { ReactNode } from "react";
import MathView from "../../MathView";
import { TippedMath } from "./TippedMath";
import { ContentContainer } from "../../ContentContainer";
import { InlineMathNodeReactComponent } from "./InlineMathNodeReactComponent";
import { SerializedDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { boolean } from "zod";

export type SerializedInlineMathNode = Spread<
  {
    __tex: string;
  },
  SerializedLexicalNode
>;

export class InlineMathNode extends DecoratorNode<ReactNode> {
  __showToolTip: boolean = false;
  __tex: string = String.raw`F = m\vec{a}`;
  __selection: RangeSelection | null = null;
  __selected: boolean = false;

  static getType(): string {
    return "InlineMathNode";
  }

  static clone(node: InlineMathNode): InlineMathNode {
    return new InlineMathNode(node.__tex, node.__key);
  }

  constructor(tex: string, key?: NodeKey) {
    super(key);
    if (tex.length > 0) this.__tex = tex;
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): false {
    return false;
  }

  isInline(): boolean {
    return true;
  }

  getSelected() {
    const self = this.getLatest();
    return self.__selected;
  }

  setSelected(selected: boolean) {
    const self = this.getWritable();
    self.__selected = selected;
  }

  setShowToolTip(showToolTip: boolean) {
    const self = this.getWritable();
    self.__showToolTip = showToolTip;
  }

  getShowToolTip(): boolean {
    const self = this.getLatest();
    return self.__showToolTip;
  }

  getSelection() {
    const self = this.getLatest();
    return self.__selection;
  }

  setSelection(selection: RangeSelection | null) {
    const self = this.getWritable();
    // console.assert(selection);
    self.__selection = selection;
    // debugger;
  }

  getTex() {
    const self = this.getLatest();
    return self.__tex;
  }

  setTex(tex: string) {
    const self = this.getWritable();
    // debugger;
    self.__tex = tex;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = this.createDOM();
    element.innerText = this.getTex();
    element.classList.add("InlineMathNode");
    return {
      element: element,
    };
    // return {
    //   element: element,
    // };
  }

  static importDOM(): DOMConversionMap | null {
    // debugger;
    return {
      span: (node: Node) => {
        // debugger;
        var n = node as HTMLElement;
        if (n.classList.contains("InlineMathNode")) {
          // debugger;
          return {
            conversion: () => {
              return {
                node: $createInlineMathNode(n.innerText),
              };
            },
            priority: 4,
          };
        } else {
          return null;
        }
      },
    };
  }

  exportJSON(): SerializedInlineMathNode {
    return {
      type: "InlineMathNode",
      version: 1,
      __tex: this.getTex(),
    };
  }

  static importJSON(jsonNode: SerializedInlineMathNode): InlineMathNode {
    const node = $createInlineMathNode(jsonNode.__tex);
    // node.setFormat(serializedNode.format);
    // node.setIndent(serializedNode.indent);
    // node.setDirection(serializedNode.direction);
    return node;
  }

  closeToolTip(_editor: LexicalEditor) {
    // const selection = this.getSelection();

    _editor.update(
      (() => {
        // const s = selection;
        const self = this.getLatest();
        debugger;

        const selection = self.__selection;
        if (!selection) debugger;
        // debugger;
        setTimeout(() => {
          _editor.update(() => {
            $setSelection(selection);
            console.log("set selection to : " + JSON.stringify(selection));
            setTimeout(() => {
              _editor.update(() => {
                const selection = $getSelection();
                debugger;
              });
            }, 500);
          });
        }, 500);

        const node = $getNodeByKey(this.__key);
        if (node !== null && $isInlineMathNode(node)) {
          // node.setShowToolTip(false);
        }
      }).bind(this),
    );
  }

  openToolTip(_editor: LexicalEditor) {
    _editor.update(() => {
      debugger;

      const node = $getNodeByKey(this.__key);
      if (node !== null && $isInlineMathNode(node)) {
        node.setShowToolTip(true);
      }
    });
  }

  decorate(_editor: LexicalEditor): ReactNode {
    const showTooltip = this.__showToolTip;

    // debugger;
    return (
      // <span>hey am i inline</span>
      <ContentContainer
        onLongPress={() => {
          // this.openToolTip(_editor);
        }}
      >
        <InlineMathNodeReactComponent
          showToolTip={showTooltip}
          selected={this.getSelected()}
          handleCloseToolTip={({ exitDirection }) => {
            // debugger;
            console.log(
              "[InlineMathNode] handleCloseToolTip. Exit direction: " +
                exitDirection,
            );
            // this.closeToolTip(_editor);
            // _editor.update(() => {
            //   const self = this.getLatest();
            //   debugger;
            // });
          }}
          defaultTex={this.getTex()}
          updateTex={(tex: string) => {
            // debugger;
            _editor.update(() => {
              // debugger;
              const node = $getNodeByKey(this.__key);
              const self = this.getLatest();

              if (node !== null && $isInlineMathNode(node)) {
                node.setTex(tex);
                // debugger;
                const tex1 = node.__selection;
                // console.assert(tex1);
                node.setSelection(tex1);
              }
              // let selection = self.__selection?.clone();
              // if (!selection) debugger;
              // console.assert(selection !== undefined);
              // console.log("set selection to : " + selection);
              // if (!selection) return;
              // debugger;
              // selection.anchor.offset -= 2;
              // $setSelection(selection);
              // setTimeout(() => {
              //   _editor.update(() => {
              //     console.log("set selection to : " + self.__selection);
              //     let selection = self.__selection?.clone();
              //     if (!selection) return;
              //     $setSelection(selection);
              //   });
              // }, 5);
            });
            // this.setTex(tex);
          }}
        />
      </ContentContainer>
    );
    // return <MathView value={"F = ma"} />;
    // return <div>Inline Math</div>;
  }
}

export function $createInlineMathNode(
  tex: string,
  showTooltip?: boolean,
): InlineMathNode {
  const res = new InlineMathNode(tex);

  if (showTooltip !== undefined) res.setShowToolTip(showTooltip);
  return res;
}

export function $isInlineMathNode(
  node: LexicalNode | null | undefined,
): node is InlineMathNode {
  return node instanceof InlineMathNode;
}
