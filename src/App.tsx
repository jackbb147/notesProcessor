import React, {useState} from 'react';
import logo from './logo.svg';
import {SidePanel} from "./SidePanel";
import './App.css';
import {ListItem} from "./ListItem";

function App()
{

    return (
        <div className="App bg-grey w-full h-full flex flex-row">
            <SidePanel panelChildren={
                <div className={"w-full h-full  flex flex-col pl-4 pr-4"}>
                    <div className={"top-bar h-12 "}>

                    </div>
                    <div className={"foldersContainer grow"}>
                        <ListItem text={"New Folder"} icon={"../icons/folder_FILL0_wght400_GRAD0_opsz48.svg"}></ListItem>
                        <ListItem text={"Recently Deleted"}></ListItem>



                    </div>
                </div>
            }>
                <div className={"App__main bg-white h-full grow"}>
                    <SidePanel></SidePanel>
                </div>
            </SidePanel>
        </div>
    );
}

export default App;
