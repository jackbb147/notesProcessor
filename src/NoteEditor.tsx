import React, {LegacyRef, useEffect, useRef, useState} from "react";
import {Quill} from "react-quill";
import {MathEditorModule} from "./Quill-MathJax/MathEditorModule";
import "./Quill-MathJax/quill.bubble.css"
import "./Quill-MathJax/quill.snow.css"
import {Node} from "./GraphReducer"

function QuillBoxComponent({val, handleBlur, onFinishSetup, onChange, onTouchStart}:{
    val: string,
    handleBlur: (s:string)=>any,
    onFinishSetup: ()=>any,
    onChange: (s:string)=>any,
    onTouchStart: ()=>any
})
{
    const wrapperRef = useRef<any>(null);
    const ref = useRef<any>(null);
    const [finishedSetup, setFinishedSetup] = useState(false)




    useEffect(()=>{
        if(!ref.current){
            console.log("ref current not ready")
            return;
        }
        console.log("Setting up!!!")

        if(finishedSetup) return;
        var container = ref.current;
        if(container.previousSibling)
        // if(wrapperRef.current.children.length > 1)debugger;
            wrapperRef.current.removeChild(container.previousSibling)
        // ;


        setUpQuill(container)
        return ()=>{
            // let c = ref.current;
            // ;
            if(ref.current)
            {
                // debugger;
                ref.current.innerHTML = "";
                ref.current.className = ""
                // wrapperRef.current.className = ""
                console.log(`-------- quill clean up finished ----------`)
            }
        }
    }, [])

    function setUpQuill(container:HTMLElement)
    {


        var quillNode = new Quill(container, {
            // theme: "snow",
            theme: "snow",
            modules:{
                MathEditorModule: {},
                keyboard: {
                    bindings: MathEditorModule.getBindings()
                }
            }
        })

        quillNode.on("text-change", ()=>{
            // debugger;
            let contentDelta = quillNode.getContents();
            console.log(`calling onChange with contentDelta: ${JSON.stringify(contentDelta)}`)
            // debugger;
            onChange(quillNode.root.innerHTML)
        })

        // ;

        // when user finishes editing this node.
        quillNode.root.addEventListener("blur", ()=>{
            handleBlur(quillNode.root.innerHTML)
            // var a = dataObjects[i]
            // a.content = quillNode.root.innerHTML;
            // var d = dataObjects
            // handleDataObjectsChange(dataObjects)
            // ;
            //     TODO update the data objects.
        } )


        quillNode.root.addEventListener("mousedown", e=>{
            e.stopPropagation() // this is to prevent dragging when user is editing.
        })

        quillNode.root.addEventListener("touchstart", e=>{
            e.stopPropagation()
        })

        if(onTouchStart){
            quillNode.root.addEventListener("touchstart", e=>{
                onTouchStart()
            })
            // quillNode.root.addEventListener("touchstart", onTouchStart)
            // quillNode.root.addEventListener("mousedown", onTouchStart)
        }


        let value = val;
        // debugger;
        // quillNode.setText(String.raw `<p>hey</p>`)
        // quillNode.setText(value)
        const delta = quillNode.clipboard.convert(value);
        // debugger;
        quillNode.setContents(delta, 'silent');
        setFinishedSetup(true)
        onFinishSetup()

    }

    return (
        <div ref={wrapperRef}>
            <div  ref={ref}></div>
        </div>
    )

}



export function NoteEditor()
{
    return (
        <div>
            <QuillBoxComponent val={""}
                               handleBlur={()=>{}}
                               onFinishSetup={()=>{}}
                               onChange={()=>{}}
                               onTouchStart={()=>{}}></QuillBoxComponent>

        </div>
    )
}








