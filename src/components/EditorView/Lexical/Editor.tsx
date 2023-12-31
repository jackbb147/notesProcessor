import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import React, { useEffect, useRef, useState } from "react";

import {
  $getRoot,
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  EditorState,
  LexicalCommand,
  RootNode,
  SerializedEditorState,
  SerializedLexicalNode,
  SerializedTextNode,
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
import ToolbarPlugin from "../Toolbar/ToolbarPlugin";
import { NodeEventPlugin } from "@lexical/react/LexicalNodeEventPlugin";
import OutsideAlerter from "../../ui/OutsideAlerter";
import { Scrollbars } from "react-custom-scrollbars-2";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { HandleSaveNotePlugin } from "./HandleSaveNotePlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import AutoLinkPlugin from "./AutoLinkPlugin";
import { useSwipeable } from "react-swipeable";
import { AppActionType } from "../../../reducers/AppStateReducer";
import { useAppDispatch } from "../../../hooks/AppStateAndGraphAndUserhooks";
import { HandleInsertDoubleDollarSignShortcutPlugin } from "./HandleInsertDoubleDollarSignShortcutPlugin";
import { InlineMathPlugin } from "./Math/InlineMathPlugin";

function RadixScrollArea({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const handlers = useSwipeable({
    onSwipedRight: (eventData) => {
      console.log("User Swiped!", eventData);
      dispatch({
        type: AppActionType.setActiveNodeID,
        id: undefined,
      });
    },
    // ...config,
  });
  return (
    <ScrollArea.Root
      className={"RADIX_SCROLL_AREA w-full h-full overflow-hidden"}
      {...handlers}
    >
      <ScrollArea.Viewport className={"w-full h-full pr-2.5"}>
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}

export function Editor({
  note,
  handleBlur,
}: {
  note: GraphNode;
  handleBlur: (title: string, content: string) => any;
}) {
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
          t?.parentElement?.className.includes("ace") ||
          t?.closest(".heading-selector")
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
          nodes: [
            InlineMathNode,
            HeadingNode,
            CodeNode,
            QuoteNode,
            ListNode,
            ListItemNode,
            LinkNode,
            AutoLinkNode,
          ],
          onError: (error, editor) => {
            console.error("error: ", error);
            console.trace();

            console.dir(editor);
            // debugger;
          },
          theme: Theme,
        }}
      >
        <div
          className={"EDITOR_WRAPPER"}
          style={{
            // border: "1px solid white",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ToolbarPlugin />

          <RadixScrollArea>
            <InlineMathPlugin />
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  style={{
                    outline: "none",
                    textAlign: "left",
                  }}
                />
              }
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />
            {/*  https://github.com/facebook/lexical/issues/2854#issuecomment-1422253235 */}
            <TabIndentationPlugin />
            {/*<OnChangePlugin onChange={onChange} ignoreSelectionChange />*/}
            <UpdateHandlerPlugin />
            <HTMLToLexicalPlugin html={note.Content} />
            <HistoryPlugin />
            <ListPlugin />
            <AutoLinkPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

            <HandleSaveNotePlugin
              clickedOutside={clickedOutside}
              handleSaveNote={handleBlur}
              note={note}
            />
            <HandleInsertDoubleDollarSignShortcutPlugin />
          </RadixScrollArea>
        </div>
      </LexicalComposer>
    </OutsideAlerter>
  );
}

function Placeholder() {
  return <div className="editor-placeholder">Write something ...</div>;
}
