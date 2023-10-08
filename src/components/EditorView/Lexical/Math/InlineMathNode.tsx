import {
  $getNodeByKey,
  DecoratorNode,
  DOMConversionMap,
  DOMExportOutput,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
} from "lexical";
import React, { ReactNode } from "react";
import MathView from "../../MathView";
import { TippedMath } from "../../TippedMath";
import { ContentContainer } from "../../ContentContainer";
import { InlineMathNodeReactComponent } from "./InlineMathNodeReactComponent";

export class InlineMathNode extends DecoratorNode<ReactNode> {
  __showToolTip: boolean = false;
  __tex: string = String.raw`F = m\vec{a}`;

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

  setShowToolTip(showToolTip: boolean) {
    const self = this.getWritable();
    self.__showToolTip = showToolTip;
  }

  getShowToolTip(): boolean {
    const self = this.getLatest();
    return self.__showToolTip;
  }

  getTex() {
    const self = this.getLatest();
    return self.__tex;
  }

  setTex(tex: string) {
    const self = this.getWritable();
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

  exportJSON(): SerializedLexicalNode {
    return {
      type: "InlineMathNode",
      version: 1,
    };
  }

  importJSON(jsonNode: SerializedLexicalNode): InlineMathNode {
    const node = $createInlineMathNode(this.__id);
    // node.setFormat(serializedNode.format);
    // node.setIndent(serializedNode.indent);
    // node.setDirection(serializedNode.direction);
    return node;
  }

  closeToolTip(_editor: LexicalEditor) {
    _editor.update(() => {
      const node = $getNodeByKey(this.__key);
      if (node !== null && $isInlineMathNode(node)) {
        node.setShowToolTip(false);
      }
    });
  }

  openToolTip(_editor: LexicalEditor) {
    _editor.update(() => {
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
          this.openToolTip(_editor);
        }}
      >
        <InlineMathNodeReactComponent
          showToolTip={showTooltip}
          handleCloseToolTip={() => {
            this.closeToolTip(_editor);
          }}
          defaultTex={this.getTex()}
          updateTex={(tex: string) => {
            // debugger;
            _editor.update(() => {
              const node = $getNodeByKey(this.__key);
              if (node !== null && $isInlineMathNode(node)) {
                node.setTex(tex);
              }
            });
            // this.setTex(tex);
          }}
        />
        {/*<TippedMath*/}
        {/*  value={this.getTex()}*/}
        {/*  onChange={(tex: string) => {*/}
        {/*    console.log("[onChange] fired in TippedMath. tex: " + tex);*/}
        {/*    // alert("hey");*/}
        {/*    this.hanleTexChange(_editor, tex);*/}
        {/*  }}*/}
        {/*  showTooltip={true}*/}
        {/*  requestClose={() => {*/}
        {/*    this.closeToolTip(_editor);*/}
        {/*  }}*/}
        {/*/>*/}
      </ContentContainer>
    );
    // return <MathView value={"F = ma"} />;
    // return <div>Inline Math</div>;
  }
}

export function $createInlineMathNode(tex: string): InlineMathNode {
  return new InlineMathNode(tex);
}

export function $isInlineMathNode(
  node: LexicalNode | null | undefined,
): node is InlineMathNode {
  return node instanceof InlineMathNode;
}
