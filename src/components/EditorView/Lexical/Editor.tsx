import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useEffect, useState } from "react";
import {
  $getRoot,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  EditorState,
  LexicalCommand,
  RootNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { UpdateHandlerPlugin } from "./UpdateHandlerPlugin";
import { GraphNode } from "../../../reducers/GraphReducer";

import { $createInlineMathNode, InlineMathNode } from "./Math/InlineMathNode";
import { HTMLToLexicalPlugin } from "./HTMLToLexicalPlugin";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { Theme } from "./Theme";
import "./theme.css";
import MyToolbar from "../Toolbar/Toolbar";
import { NodeEventPlugin } from "@lexical/react/LexicalNodeEventPlugin";
import OutsideAlerter from "../../ui/OutsideAlerter";

function MyPlugin() {
  const [editor] = useLexicalComposerContext();
  function myListener(event: Event) {
    // You may want to filter on the event target here
    // to only include clicks on certain types of DOM Nodes.
    alert("blurred");
  }
  useEffect(() => {
    return editor.registerRootListener((rootElement, prevRootElement) => {
      // debugger;
      // add the listener to the current root element
      rootElement?.addEventListener("blur", myListener);
      // remove the listener from the old root element - make sure the ref to myListener
      // is stable so the removal works and you avoid a memory leak.
      prevRootElement?.removeEventListener("blur", myListener);
    });
  }, [editor]);
  return null;
}

export function Editor({ note }: { note: GraphNode }) {
  const [clickedOutside, setClickedOutside] = useState(0);
  return (
    <OutsideAlerter
      callback={() => {
        console.warn("outside click");
        // alert("outside click");
        setClickedOutside((prev) => prev + 1);
      }}
      condition={(me, target) => {
        const t = target as HTMLElement;
        // debugger;
        // this is to make sure that a click on the tippy popup or the formula box doesn't trigger the outside click handler
        if (
          t?.parentElement?.offsetParent?.id.includes("tippy") ||
          t?.parentElement?.className.includes("ace")
        ) {
          return false;
        }
        return true;
        // debugger;
      }}
    >
      <LexicalComposer
        initialConfig={{
          namespace: "editor",
          nodes: [InlineMathNode],
          onError: (error) => {
            console.log("error: ", error);
          },
          theme: Theme,
        }}
      >
        <div className="editor-container text-left">
          <MyToolbar />
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {/*  https://github.com/facebook/lexical/issues/2854#issuecomment-1422253235 */}
          <TabIndentationPlugin />{" "}
          {/*<OnChangePlugin onChange={onChange} ignoreSelectionChange />*/}
          <UpdateHandlerPlugin />
          <HTMLToLexicalPlugin html={note.Content} />
          <HistoryPlugin />
          {/*<MyPlugin />*/}
          {/*<NodeEventPlugin*/}
          {/*  nodeType={RootNode}*/}
          {/*  eventType={"click"}*/}
          {/*  eventListener={(e: Event) => {*/}
          {/*    alert("blurred");*/}
          {/*  }}*/}
          {/*/>*/}
          {/*<InlineMathPlugin />*/}
        </div>
      </LexicalComposer>
    </OutsideAlerter>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Write something ...</div>;
}
