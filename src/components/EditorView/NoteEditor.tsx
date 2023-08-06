import React, {useEffect, useRef, useState} from "react";
import {Quill} from "react-quill";
import "./quillModules/quillStyle.css"

//@ts-ignore
import {MathEditorModule} from "./quillModules/Quill-MathJax/MathEditorModule";
import "./quillModules/Quill-MathJax/quill.bubble.css"
import "./quillModules/Quill-MathJax/quill.snow.css"
import {GraphActionType, Node} from "../../reducers/GraphReducer"
import {RangeStatic} from "quill";
import {LabelSelector} from "./LabelSelector";
import {LastEditedWhen} from "./LastEditedWhen";
import {ActionMeta, Options} from "react-select";
import {useGraph, useGraphDispatch} from "../../hooks/AppStateAndGraphhooks";


function QuillBoxComponent({val, handleBlur, onFinishSetup, onTouchStart, isReadOnly = false, onEditAttempt=()=>{}, darkModeOn=false}:{
    val: string,
    handleBlur: (s:string, firstLine?:string)=>any,
    onFinishSetup: ()=>any,
    onTouchStart: ()=>any,
    isReadOnly?: boolean|undefined,
    onEditAttempt?: ()=>any,
    darkModeOn?: boolean
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

    useEffect(()=>{
        document.querySelectorAll(".ql-container.ql-snow").forEach(val=>{
            val.classList.add("noBorder")
        })

        if(darkModeOn)
        {
            document.querySelectorAll(".ql-toolbar").forEach(val=>{
                val.classList.add("onlyBorderBottom")
            })
        }else{
            document.querySelectorAll(".ql-toolbar").forEach(val=>{
                val.classList.remove("noBorder")
            })
        }
    }, [darkModeOn])

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

        const toolbarOptions:any  = [
        ['bold', 'italic'],
        [ 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ];

        var quillNode = new Quill(container, {

            theme: "snow",
            placeholder: "Type something...",
            modules:{
                toolbar:toolbarOptions,
                // MathEditorModule: {},
                // keyboard: {
                //     bindings: MathEditorModule.getBindings()
                // }
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

        var wrapper = wrapperRef.current;


        quillNode.root.addEventListener("blur", (e:FocusEvent)=>{

            if(!wrapper.contains(e.relatedTarget))
            {
                let lengthOfFirstLine = quillNode.getLine(0)[0].cache.length-1;
                console.log(`quill node is handling blur!! `)
                handleBlur(
                    quillNode.getLength() > 1 ? quillNode.root.innerHTML : "",
                    quillNode.getText(0, lengthOfFirstLine)) //TODO
            }
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
        <div ref={wrapperRef}  tabIndex={0} style={{
            // width: "100%",
            flexGrow:"1",
            height:"100%",
            overflow: "scroll"
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
    onEditAttempt = ()=>{console.log("Edit attempted")},
    darkModeOn = true
}:{
    note: Node
    onBlur?: (note:Node)=>any,
    onFinishSetUp?: ()=>any,
    locked?: boolean |undefined,
    onEditAttempt?: () => any,
    darkModeOn?: boolean
})
{
    const graph = useGraph();
    const graphDispatch = useGraphDispatch();

    const appState = useState();


    const noteRef = useRef<Node>(note) //https://stackoverflow.com/questions/57847594/react-hooks-accessing-up-to-date-state-from-within-a-callback
    noteRef.current = note;

    useEffect(()=>{
        console.log(`note changed: ${JSON.stringify(note)}`)
    }, [note])

    useEffect(()=>{
        console.log("HEY! CHANGING COLOR")
        if(darkModeOn)
        {
            document.querySelectorAll(".ql-toolbar .ql-stroke").forEach((val:Element)=>{
                val.classList.add("fill-none", "stroke-fff");
            })

            document.querySelectorAll(".ql-toolbar .ql-fill").forEach((val:Element)=>{
                val.classList.add("fill-fff", "stroke-none");
            })

            document.querySelectorAll(".ql-toolbar .ql-picker").forEach((val:Element)=>{
                // val.classList.add("color-fff");
            })

            document.querySelectorAll(".ql-picker-label").forEach(val=>{
                val.classList.add("color-white")
            })

            document.querySelectorAll(".ql-quillModules.ql-blank").forEach(val=>{
                val.classList.add("placeholderWhite")
            })


        }else{
            document.querySelectorAll(".ql-toolbar .ql-stroke").forEach((val:Element)=>{
                val.classList.remove("fill-none", "stroke-fff");
            })

            document.querySelectorAll(".ql-toolbar .ql-fill").forEach((val:Element)=>{
                val.classList.remove("fill-fff", "stroke-none");
            })

            document.querySelectorAll(".ql-toolbar .ql-picker").forEach((val:Element)=>{
                // val.classList.remove("color-fff");
            })

            document.querySelectorAll(".ql-picker-label").forEach(val=>{
                val.classList.remove("color-white")
            })

            document.querySelectorAll(".ql-quillModules.ql-blank").forEach(val=>{
                val.classList.remove("placeholderWhite")
            })
        }
    }, [darkModeOn])

    function handleBlur(s:string, firstLine:string="")
    {
        // debugger;
        var newNode:Node = {
            ...noteRef.current,
            content: s,
            title: firstLine,
            dateLastModified: new Date()
        }
        // debugger;
        onBlur(newNode)
    }

    function handleChange(value:Options<any>,action:ActionMeta<any>)
    {
        // debugger
        switch (action.action)
        {
            case "create-option":
            {
                // debugger;
                graphDispatch({
                    type: GraphActionType.addLabel,
                    label: action.option.label
                })

                graphDispatch({
                    type: GraphActionType.addLabelToNode,
                    label: action.option.label,
                    id: note.id
                })


                break;
            }

            case "select-option":
            {
                graphDispatch({
                    type: GraphActionType.updateNode,
                    node: {
                        ...note,
                        labels: [...note.labels, action.option.label]
                    }
                })
                break;
            }

            case "deselect-option":
            {
                console.log("Deselect option fired")
                // debugger;
                // graphDispatch({
                //     type: GraphActionType.updateNode,
                //     node: {
                //         ...note,
                //         labels: note.labels.filter((s:string)=>s !== action.option.label)
                //     }
                // })
                break;
            }

            case "remove-value":
            {
                // debugger;
                console.log("remove value fired")
                // debugger;
                graphDispatch({
                    type: GraphActionType.updateNode,
                    node: {
                        ...note,
                        labels: note.labels.filter((s:string)=>s !== action.removedValue.label)
                    }
                })
                break;
            }
        }
    }



    return (
        <div style={{
            // width: "100%",
            flexGrow: "1",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }}>


            <div style={{
                height: "95%",
                border: darkModeOn ?  "1px solid white" :  "1px solid #ccc",
                marginBottom: ".2rem"
            }}>
                <QuillBoxComponent val={note.content}
                                   handleBlur={(s:string, firstLine?:string)=>{handleBlur(s,firstLine)}}
                                   onFinishSetup={onFinishSetUp}
                                   isReadOnly={locked}
                                   onEditAttempt={onEditAttempt}
                                   darkModeOn={darkModeOn}
                                   onTouchStart={()=>{}}/>
            </div>


            <div style={{
                display: "flex",
                flexDirection:"row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexGrow: "1"
            }}>
                <div style={{
                    width: "65%"
                }}>
                    <LabelSelector
                        handleChange={handleChange}
                        labels={note.labels}
                    />
                </div>

                <div style={{
                    flexGrow: "1"
                }}>
                    <LastEditedWhen/>
                </div>
            </div>

        </div>
    )
}








