import {
  $getNodeByKey,
  DecoratorNode,
  LexicalEditor,
  LexicalNode,
  NodeKey,
} from "lexical";
import React, { ReactNode } from "react";
import MathView from "../../MathView";
import { TippedMath } from "../../TippedMath";
import { ContentContainer } from "../../ContentContainer";
import { InlineMathNodeReactComponent } from "./InlineMathNodeReactComponent";

export class InlineMathNode extends DecoratorNode<ReactNode> {
  __id: string;
  __showToolTip: boolean = false;

  static getType(): string {
    return "InlineMathNode";
  }

  static clone(node: InlineMathNode): InlineMathNode {
    return new InlineMathNode(node.__id, node.__key);
  }

  constructor(id: string, key?: NodeKey) {
    super(key);
    this.__id = id;
  }

  createDOM(): HTMLElement {
    return document.createElement("div");
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
    return (
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
    // return <VideoPlayer videoID={this.__id} />;
  }
}

export function $createInlineMathNode(id: string): InlineMathNode {
  return new InlineMathNode(id);
}

export function $isInlineMathNode(
  node: LexicalNode | null | undefined,
): node is InlineMathNode {
  return node instanceof InlineMathNode;
}
