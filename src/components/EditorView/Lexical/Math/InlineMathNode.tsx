import { DecoratorNode, LexicalNode, NodeKey } from "lexical";
import React, { ReactNode } from "react";
import MathView from "../../MathView";
import { TippedMath } from "../../TippedMath";

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

  setShowToolTip(showToolTip: boolean) {
    this.__showToolTip = showToolTip;
  }

  decorate(): ReactNode {
    const showTooltip = this.__showToolTip;
    const setShowTooltip = this.setShowToolTip.bind(this);
    return (
      <TippedMath
        value={"F = ma"}
        onChange={() => {}}
        showTooltip={this.__showToolTip}
        requestClose={setShowTooltip}
      />
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
