import React, {LegacyRef, useEffect, useRef, useState} from "react";
import ReactQuill, {Quill} from "react-quill";

//@ts-ignore
import {MathEditorModule} from "./Quill-MathJax/MathEditorModule";
import "./Quill-MathJax/quill.bubble.css"
import "./Quill-MathJax/quill.snow.css"
import {Node} from "./GraphReducer"
import {RangeStatic} from "quill";

function QuillBoxComponent({val, handleBlur, onFinishSetup, onTouchStart, isReadOnly = false, onEditAttempt=()=>{}}:{
    val: string,
    handleBlur: (s:string)=>any,
    onFinishSetup: ()=>any,
    onTouchStart: ()=>any,
    isReadOnly?: boolean|undefined,
    onEditAttempt?: ()=>any
})
{
    const wrapperRef = useRef<any>(null);
    const ref = useRef<any>(null);
    const [finishedSetup, setFinishedSetup] = useState(false)
    const [quillNode, setQuillNode] = useState<any>(undefined)
    const [selection, setSelection] = useState<RangeStatic|null>(null);



    useEffect(()=>{
        if(!ref.current){
            console.log("ref current not ready")
            return;
        }
        console.log("Setting up!!!")

        if(finishedSetup) return;
        var container = ref.current;
        if(container.previousSibling)
            wrapperRef.current.removeChild(container.previousSibling)

        setUpQuill(container)
        return cleanUp
    }, [])

    function cleanUp()
    {
        if(ref.current)
        {
            // debugger;
            ref.current.innerHTML = "";
            ref.current.className = ""
            // wrapperRef.current.className = ""
            console.log(`-------- quill clean up finished ----------`)
        }
    }

    useEffect(()=>{
        console.log("=============VAL CHANGED: " + val + " ==================")
        let q = quillNode;
        if(q !== undefined)
        {
            setVal(val, q);
            setQuillSelection(selection);
        }


    }, [val])

    function setUpQuill(container:HTMLElement)
    {


        let toolbarContainer = document.querySelector("#editorButtonGroup")
        if(toolbarContainer)
            // https://quilljs.com/docs/themes/#snow/
            toolbarContainer.innerHTML='<!-- Add font size dropdown -->\n' +
                '  <select class="ql-size">\n' +
                '    <option value="small"></option>\n' +
                '    <!-- Note a missing, thus falsy value, is used to reset to default -->\n' +
                '    <option selected></option>\n' +
                '    <option value="large"></option>\n' +
                '    <option value="huge"></option>\n' +
                '  </select>\n' +
                '  <!-- Add a bold button -->\n' +
                '  <button class="ql-bold"></button>\n' +
                '  <button class="ql-italic"></button>\n' +
                '  <button class="ql-underline"></button>\n'+
                '  <button class="ql-code-block"></button>\n'



        // debugger;
        var quillNode = new Quill(container, {

            theme: "snow",
            modules:{
                toolbar:{
                  container: "#editorButtonGroup"
                },
                MathEditorModule: {},
                keyboard: {
                    bindings: MathEditorModule.getBindings()
                }
            },
            readOnly: isReadOnly
        })

        setQuillNode(quillNode)


        // quillNode.on("text-change", ()=>{
        //     // debugger;
        //     let contentDelta = quillNode.getContents();
        //     console.log(`calling onChange with contentDelta: ${JSON.stringify(contentDelta)}`)
        //     setSelection(prev=>quillNode.getSelection())
        //     onChange(quillNode.root.innerHTML)
        // })

        // when user finishes editing this node.
        quillNode.root.addEventListener("blur", ()=>
        {
            handleBlur(quillNode.root.innerHTML)
            //     TODO update the data objects.
        })


        if(isReadOnly)
        {
            quillNode.root.addEventListener("mousedown", e=>{
                e.stopPropagation() // this is to prevent dragging when user is editing.
                onEditAttempt()
            })

            // quillNode.root.addEventListener("touchstart", e=>{
            //     e.stopPropagation()
            // })
        }


        if(onTouchStart){
            quillNode.root.addEventListener("touchstart", e=>{
                onTouchStart()
            })
            // quillNode.root.addEventListener("touchstart", onTouchStart)
            // quillNode.root.addEventListener("mousedown", onTouchStart)
        }

        setVal(val, quillNode);
        setFinishedSetup(true)
        onFinishSetup()
    }

    function setVal(val:string, quillNode:any)
    {
        let value = val;

        const delta = quillNode.clipboard.convert(value);
        // debugger;
        quillNode.setContents(delta, 'silent');
    }

    function setQuillSelection(selection:RangeStatic|null)
    {
        quillNode.setSelection(selection);
    }

    return (
        <div ref={wrapperRef} style={{
            width: "100%",
            height:"100%",

        }}>
            <div  ref={ref}></div>
        </div>
    )

}


/**
 *
 * @param note
 * @param onBlur
 * @param onFinishSetUp
 * @param locked
 * @param onEditAttempt callback for when user attempts to edit a locked node.
 * @constructor
 */
export function NoteEditor({
    note,
    onBlur = (note: Node) => {},
    onFinishSetUp = () => {},
    locked = false,
    onEditAttempt = ()=>{console.log("Edit attempted")}
}:{
    note: Node
    onBlur?: (note:Node)=>any,
    onFinishSetUp?: ()=>any,
    locked?: boolean |undefined,
    onEditAttempt?: () => any
})
{

    const noteRef = useRef<Node>(note) //https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
    noteRef.current = note;

    useEffect(()=>{
        console.log(`note changed: ${JSON.stringify(note)}`)
    }, [note])

    function handleBlur(s:string, note:Node)
    {
        var newNode:Node = {
            ...noteRef.current,
            content: s
        }
        // debugger;
        onBlur(newNode)
    }



    return (
        <div style={{
            width: "100%",
            height: "100%",

        }}>

            <QuillBoxComponent val={note.content}
                               handleBlur={(s:string)=>{handleBlur(s,note)}}
                               onFinishSetup={onFinishSetUp}
                                isReadOnly={locked}
                               onEditAttempt={onEditAttempt}
                               onTouchStart={()=>{}}></QuillBoxComponent>
        </div>
    )
}








