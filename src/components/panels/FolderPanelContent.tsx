import {Button} from "../ui/Button";
import {ListItem} from "./ListItem";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import React, {useContext} from "react";
import {AppStateContext, AppStateDispatchContext} from "../../reducers/AppStateContext";
import {GraphContext, GraphDispatchContext} from "../../reducers/GraphContext";

export function FolderPanelContent()
{
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);

    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);


    if(dispatch === null || state === null) throw Error("state or dispatch is null. ");
    if(graph === null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");

    function handleDarkModeTogglerClick()
    {
        if(dispatch === null) throw Error("dispatch is null")
        dispatch({type: AppActionType.toggleDarkMode})
    }



    return <>
            <div className={"top-bar h-12 flex items-center"}>
                {/*TODO */}
                <Button icon={<span className="material-symbols-outlined">
thumbnail_bar
</span>} onClick={()=>{

                    dispatch({type: AppActionType.toggleLabelPanel}) //TODO
                }}></Button>
            </div>
            <ListItem text={"All"}
                      icon={<span className="material-symbols-outlined">
folder
</span>}
                      active={state.activeCollection === Collections.All}
                      rootClassName={"mb-2"}
                      onClick={() => {
                          dispatch({
                              type: AppActionType.setActiveCollection,
                              activeCollection: Collections.All
                          })

                          if (state.activeCollection !== Collections.All) {
                              dispatch({
                                  type: AppActionType.setActiveNodeID,
                                  id: undefined
                              })
                          }
                      }}
            ></ListItem>

            {graph.labels.map((s:string)=><ListItem
                text={s}
                active={state.activeCollection === Collections.Label && state.activeLabel === s}
                onClick={()=>{
                    dispatch({
                        type: AppActionType.setActiveLabel,
                        label: s
                    })

                    dispatch({
                        type: AppActionType.setActiveNodeID,
                        id: undefined
                    })
                }}
                icon={<span className="material-symbols-outlined">
                    label
                </span>}
            />)}


            <ListItem text={"Recently Deleted"}
                      active={state.activeCollection === Collections.RecentlyDeleted}
                      icon={<span className="material-symbols-outlined">
delete
</span>}
                      onClick={() => {
                          dispatch({
                              type: AppActionType.setActiveCollection,
                              activeCollection: Collections.RecentlyDeleted
                          })
                          if (state.activeCollection !== Collections.RecentlyDeleted) {
                              dispatch({
                                  type: AppActionType.setActiveNodeID,
                                  id: undefined
                              })
                          }
                      }}
            ></ListItem>


            <div className={"mt-auto"}>
                <ListItem text={`${state.darkModeOn ? "Light" : "Dark"} Mode`}
                          onClick={handleDarkModeTogglerClick}
                          icon={<span className="material-symbols-outlined">
    light_mode
    </span>}

                ></ListItem>


                <ListItem text={"Create/Edit Labels"}
                          icon={<span className="material-symbols-outlined">
add_circle
</span>}

                ></ListItem>
            </div>

        </>
}