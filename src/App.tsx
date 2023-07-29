import React from 'react';
import {SidePanel} from "./SidePanel";
import './App.css';
import {ListItem} from "./ListItem";
import {Button} from "./Button";
import {Action, ActionType, reducer, State} from "./reducer";
import {useImmerReducer} from "use-immer";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import { v4 as uuid } from 'uuid';





function App()
{

    const [graph, dispatch] = useImmerReducer<State, Action>(reducer, {nodes: []});




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
                        <ListItem text={"Create/Edit Labels"} icon={"../icons/edit_FILL0_wght400_GRAD0_opsz48.svg"} rootClassName={"mt-auto"}></ListItem>
                    </div>
                </div>
            }>
                <div className={"App__main bg-white h-full grow"}>

                    <SidePanel panelChildren={
                        <div className={"w-full h-full flex flex-col pl-4 pr-4"}>
                            <div className={"top-bar h-12 flex items-center"}>
                                <Button icon={"../icons/list_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                                <Button icon={"../icons/grid_view_FILL0_wght400_GRAD0_opsz48.svg"}></Button>
                                <Button icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"} rootClassName={"ml-auto"}></Button>
                            </div>

                            <div>
                                <TransitionGroup>
                                    {graph.nodes.map((node)=><CSSTransition
                                        timeout={1000}
                                        classNames="fade"
                                        key={node.id}
                                    >
                                        <ListItem text={node.title}/>
                                    </CSSTransition>)}
                                </TransitionGroup>
                            </div>

                        </div>
                    }>
                        <div>
                            <div className={"top-bar h-12 flex items-center"}>
                                <Button onClick={()=>dispatch({
                                    type: ActionType.addNode,
                                    node: {
                                        id: uuid(),
                                        title: "hello world!",
                                        content:"no content",
                                        tags: []
                                    }
                                })} icon={"../icons/edit_square_FILL0_wght400_GRAD0_opsz48.svg"}></Button>

                            </div>
                        </div>
                    </SidePanel>
                </div>
            </SidePanel>
        </div>
    );
}

export default App;
