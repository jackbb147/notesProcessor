import { DecoratorNode, LexicalNode, NodeKey } from "lexical";
import React, { ReactNode } from "react";
import MathView from "../../MathView";

export class InlineMathNode extends DecoratorNode<ReactNode> {
  __id: string;
  static getType(): string {
    return "inline-math";
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

  decorate(): ReactNode {
    return <MathView value={"F = ma"} />;
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
