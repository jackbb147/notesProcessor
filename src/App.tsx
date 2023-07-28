import React, {useState} from 'react';
import logo from './logo.svg';
import {SidePanel} from "./SidePanel";
import './App.css';
import {ListItem} from "./ListItem";
import {Button} from "./Button";

function App()
{

    return (
        <div className="App bg-grey w-full h-full flex flex-row">
            <SidePanel panelChildren={
                <div className={"w-full h-full  flex flex-col pl-4 pr-4"}>
                    <div className={"top-bar h-12 flex items-center"}>
                        <Button icon={"../icons/thumbnail_bar_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                    </div>
                    <div className={"foldersContainer grow flex flex-col"}>
                        <ListItem text={"All"} icon={"../icons/folder_FILL0_wght400_GRAD0_opsz48.svg"} active={true} rootClassName={"mb-2"}></ListItem>
                        <ListItem text={"Recently Deleted"} icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"} ></ListItem>
                        <ListItem text={"New Folder"} icon={"../icons/add_circle_FILL0_wght400_GRAD0_opsz48.svg"} rootClassName={"mt-auto"}></ListItem>
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
