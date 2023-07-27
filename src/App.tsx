import React, {useState} from 'react';
import logo from './logo.svg';
import {SidePanel} from "./SidePanel";
import './App.css';

function App()
{

    const [dragging, setDragging] = useState(false)
    const [sidePanelWidth, setSidePanelWidth] = useState("20%");



    function onBeginResize()
    {
        setDragging(true);
    }

    function onEndResize()
    {
        setDragging(false);
    }

    function onSidePanelResize(e:React.MouseEvent):void
    {

        if(!dragging) return;
        let mouseX:number = e.clientX;
        console.log(mouseX)
        setSidePanelWidth(width=>`${mouseX}px`)
    }

    return (
        <div className="App bg-grey w-full h-full flex flex-row" onMouseMove={onSidePanelResize} onMouseUp={onEndResize}>
            <SidePanel
                width={sidePanelWidth}
                onBeginResize={onBeginResize}
            ></SidePanel>
            <div className={"App__main bg-white h-full grow"}> 2</div>
        </div>
    );
}

export default App;
