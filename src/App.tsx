import React, {useState} from 'react';
import logo from './logo.svg';
import {SidePanel} from "./SidePanel";
import './App.css';

function App()
{

    return (
        <div className="App bg-grey w-full h-full flex flex-row">
            <SidePanel
            >
                <div className={"App__main bg-white h-full grow"}> 2</div>
            </SidePanel>
        </div>
    );
}

export default App;
