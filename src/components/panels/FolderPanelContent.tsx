import {Button} from "../ui/Button";
import {ListItem} from "./ListItem";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import React, {useContext} from "react";
import {AppStateContext} from "../AppStateContext";
import {AppStateDispatchContext} from "../AppStateContext";

export function FolderPanelContent()
{
    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(dispatch === null || state === null) throw Error("state or dispatch is null. ")



    return <>
            <div className={"top-bar h-12 flex items-center"}>
                {/*TODO */}
                <Button icon={"../icons/thumbnail_bar_FILL0_wght400_GRAD0_opsz48.svg"} onClick={()=>{

                    // dispatch({type: AppActionType.toggleLabelPanel}) //TODO
                }}></Button>
            </div>
            <ListItem text={"All"}
                      icon={"../icons/folder_FILL0_wght400_GRAD0_opsz48.svg"}
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
            <ListItem text={"Recently Deleted"}
                      active={state.activeCollection === Collections.RecentlyDeleted}
                      icon={"../icons/delete_FILL0_wght400_GRAD0_opsz48 (1).svg"}
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
            <ListItem text={"Create/Edit Labels"}
                      icon={"../icons/edit_FILL0_wght400_GRAD0_opsz48.svg"}
                      rootClassName={"mt-auto"}
            ></ListItem>
        </>
}