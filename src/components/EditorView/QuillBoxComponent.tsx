import React, { useEffect, useRef, useState } from "react";
import { RangeStatic } from "quill";
import { Quill } from "react-quill";

export function QuillBoxComponent({
  val,
  handleBlur,
  onFinishSetup,
  onTouchStart,
  isReadOnly = false,
  onEditAttempt = () => {},
  darkModeOn = false,
  width,
}: {
  val: string;
  handleBlur: (s: string, firstLine?: string) => any;
  onFinishSetup: () => any;
  onTouchStart: () => any;
  isReadOnly?: boolean | undefined;
  onEditAttempt?: () => any;
  darkModeOn?: boolean;
  width?: string;
}) {
  const wrapperRef = useRef<any>(null);
  const ref = useRef<any>(null);
  const [finishedSetup, setFinishedSetup] = useState(false);
  const [quillNode, setQuillNode] = useState<any>(undefined);
  const [selection, setSelection] = useState<RangeStatic | null>(null);

  useEffect(() => {
    if (!ref.current) {
      console.log("ref current not ready");
      return;
    }
    console.log("Setting up!!!");

    if (finishedSetup) return;
    var container = ref.current;
    if (container.previousSibling)
      wrapperRef.current.removeChild(container.previousSibling);

    setUpQuill(container);
    return cleanUp;
  }, []);

  useEffect(() => {
    document.querySelectorAll(".ql-container.ql-snow").forEach((val) => {
      val.classList.add("noBorder");
    });

    if (darkModeOn) {
      document.querySelectorAll(".ql-toolbar").forEach((val) => {
        val.classList.add("onlyBorderBottom");
      });
    } else {
      document.querySelectorAll(".ql-toolbar").forEach((val) => {
        val.classList.remove("noBorder");
      });
    }
  }, [darkModeOn]);

  function cleanUp() {
    if (ref.current) {
      //
      ref.current.innerHTML = "";
      ref.current.className = "";
      // wrapperRef.current.className = ""
      console.log(`-------- quill clean up finished ----------`);
    }
  }

  useEffect(() => {
    console.log("=============VAL CHANGED: " + val + " ==================");
    let q = quillNode;
    if (q !== undefined) {
      setVal(val, q);
      setQuillSelection(selection);
    }
  }, [val]);

  function setUpQuill(container: HTMLElement) {
    const toolbarOptions: any = [
      ["bold", "italic"],
      ["underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];

    var quillNode = new Quill(container, {
      theme: "snow",
      placeholder: "Type something...",
      modules: {
        toolbar: toolbarOptions,
        // MathEditorModule: {},
        // keyboard: {
        //     bindings: MathEditorModule.getBindings()
        // }
      },
      readOnly: isReadOnly,
    });

    setQuillNode(quillNode);

    // quillNode.on("text-change", ()=>{
    //     //
    //     let contentDelta = quillNode.getContents();
    //     console.log(`calling onChange with contentDelta: ${JSON.stringify(contentDelta)}`)
    //     setSelection(prev=>quillNode.getSelection())
    //     onChange(quillNode.root.innerHTML)
    // })

    // when user finishes editing this node.

    var wrapper = wrapperRef.current;

    quillNode.root.addEventListener("blur", (e: FocusEvent) => {
      if (!wrapper.contains(e.relatedTarget)) {
        let lengthOfFirstLine = quillNode.getLine(0)[0].cache.length - 1;
        console.log(`quill node is handling blur!! `);
        handleBlur(
          quillNode.getLength() > 1 ? quillNode.root.innerHTML : "",
          quillNode.getText(0, lengthOfFirstLine),
        ); //TODO
      }
    });

    if (isReadOnly) {
      quillNode.root.addEventListener("mousedown", (e) => {
        e.stopPropagation(); // this is to prevent dragging when user is editing.
        onEditAttempt();
      });

      // quillNode.root.addEventListener("touchstart", e=>{
      //     e.stopPropagation()
      // })
    }

    if (onTouchStart) {
      quillNode.root.addEventListener("touchstart", (e) => {
        onTouchStart();
      });
      // quillNode.root.addEventListener("touchstart", onTouchStart)
      // quillNode.root.addEventListener("mousedown", onTouchStart)
    }

    setVal(val, quillNode);
    setFinishedSetup(true);
    onFinishSetup();
  }

  function setVal(val: string, quillNode: any) {
    let value = val;

    const delta = quillNode.clipboard.convert(value);
    //
    quillNode.setContents(delta, "silent");
  }

  function setQuillSelection(selection: RangeStatic | null) {
    quillNode.setSelection(selection);
  }

  return (
    <div
      ref={wrapperRef}
      // className={style.ScrollableButHiddenScrollBar}
      tabIndex={0}
      style={{
        width: width ?? "100%",
        flexGrow: "1",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div ref={ref}></div>
    </div>
  );
}
