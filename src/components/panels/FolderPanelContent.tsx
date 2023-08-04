import {Button} from "../ui/Button";
import {ListItem} from "./ListItem";
import {useDispatch, useGraph, useGraphDispatch, useState} from "../../reducers/hooks";
import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import React, {useContext, useRef} from "react";
import {GraphContext, GraphDispatchContext} from "../../reducers/GraphContext";
import {EditLabelsButton} from "./Buttons/EditLabelsButton";
import {SettingsButton} from "./Buttons/SettingsButton";
import {AccountButton} from "./Buttons/AccountButton";
import {SettingsPanel} from "./SettingsPanel";
import OutsideAlerter from "../ui/OutsideAlerter";

export function FolderPanelContent()
{
    const state = useState();
    const dispatch = useDispatch();

    const graph = useGraph();
    const graphDispatch = useGraphDispatch();

    const settingsButtonRef = useRef<any>(null);
    function handleSettingPanelOutsideClick()
    {
        dispatch({
            type: AppActionType.setShowSettingsPanel,
            show: false
        })
    }

    function SettingPanelOutsideClickCondition(me: Element, target: EventTarget | null)
    {
        if(target === null) return;
        let settingsButton = settingsButtonRef.current;

        if( settingsButton !== null && settingsButton.contains(target)) return false;
        return true;
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
                      iconOnly={state.LabelPanelClosed}
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

                          dispatch({
                              type: AppActionType.setActiveNodeID,
                              id: undefined
                          })
                      }}
            ></ListItem>

            {graph.labels.map((s:string)=><ListItem
                text={s}
                iconOnly={state.LabelPanelClosed}
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
                      iconOnly={state.LabelPanelClosed}
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
                {/*<LightModeButton/>*/}
                <EditLabelsButton/>
                {/*<UploadButton/>*/}
                {/*<DownloadButton/>*/}
                {/*<AccountButton/>*/}
                <SettingsButton ref={settingsButtonRef}/>
                <OutsideAlerter
                    condition={SettingPanelOutsideClickCondition}
                    callback={handleSettingPanelOutsideClick}>
                    <div
                        className={`
                    absolute
                    left-full
                    bottom-0
                    z-10
                `}>
                        <SettingsPanel/>
                    </div>
                </OutsideAlerter>

            </div>


        </>
}