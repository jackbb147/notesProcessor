import { styled } from "@stitches/react";
import { violet, mauve, blackA } from "@radix-ui/colors";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import styles from "./CustomScrollBar.module.css";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

const SCROLLBAR_SIZE = 7;

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: "100%",
  // height: 225,
  borderRadius: 4,
  padding: "13px 0px",
  overflow: "hidden",
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
});
const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: "flex",
  // ensures no selection
  userSelect: "none",
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: "none",
  padding: 2,
  background: blackA.blackA6,
  transition: "background 160ms ease-out",
  "&:hover": { background: blackA.blackA8 },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: "column",
    height: SCROLLBAR_SIZE,
  },
});

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: mauve.mauve10,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%",
    minWidth: 44,
    minHeight: 44,
  },
});

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: blackA.blackA8,
});

// Exports
export const ScrollArea = StyledScrollArea;
export const ScrollAreaViewport = StyledViewport;
export const ScrollAreaScrollbar = StyledScrollbar;
export const ScrollAreaThumb = StyledThumb;
export const ScrollAreaCorner = StyledCorner;
const Box = styled("div", {});
const Text = styled("div", {
  color: violet.violet11,
  fontSize: 15,
  lineHeight: "18px",
  fontWeight: 500,
});
const Tag = styled("div", {
  color: mauve.mauve12,
  fontSize: 13,
  lineHeight: "18px",
  marginRight: 10,
  borderRight: `1px solid ${mauve.mauve6}`,
  paddingRight: 10,
});

const HorizontalScroll = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  overflowX: "auto",
  scrollbarColor: "red red !important",

  // "&::-webkit-scrollbar-track": {
  //   border: "2px solid red",
  // },
  "&::-webkit-scrollbar": {
    // display: "none",
    // background: "transparent",
  },
});

export const ScrollAreaDemo = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      width: "100%",
      overflowX: "auto",
      padding: "4px 0px",
      // backgroundColor: "red",
      borderRadius: "9px",
      boxShadow:
        "0px 0px 0px #00000077,0px 0px 9px #00000055,inset 0px 0px 0px 1px #49555f",
    }}
    className={`${styles.CustomScrollBar} dark:bg-dark_secondary`}
  >
    {children}
  </div>
  // <HorizontalScroll>{children}</HorizontalScroll>
  // <HorizontalScroll>
  // <ScrollArea type={"scroll"} scrollHideDelay={300}>
  //   <ScrollAreaViewport>
  //     <div
  //       style={{
  //         // width: 400,
  //         // padding: "15px 20px",
  //         display: "flex",
  //         flexDirection: "row",
  //       }}
  //     >
  //       {children}
  //       {/*{TAGS.map((tag) => (*/}
  //       {/*  <Tag key={tag}>{tag}</Tag>*/}
  //       {/*))}*/}
  //     </div>
  //   </ScrollAreaViewport>
  //   <ScrollAreaScrollbar orientation="horizontal">
  //     <ScrollAreaThumb />
  //   </ScrollAreaScrollbar>
  //   <ScrollAreaCorner />
  // </ScrollArea>
  // </HorizontalScroll>
  // <ScrollArea type={"scroll"} scrollHideDelay={300}>
  //   <ScrollAreaViewport>
  //
  //   </ScrollAreaViewport>
  //   <ScrollAreaScrollbar orientation="horizontal">
  //     <ScrollAreaThumb />
  //   </ScrollAreaScrollbar>
  //   <ScrollAreaCorner />
  // </ScrollArea>
);
