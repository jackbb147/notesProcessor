import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import {ListItem} from "./ListItem";
import React from "react";
import {useAppState, useDispatch} from "../../hooks/AppStateAndGraphhooks";
import {useMediaQuery} from "react-responsive";

export function All()
{
    const state = useAppState()
    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ maxWidth: 767 })


    return (
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

                      if(isMobile)
                      {

                          dispatch({
                              type: AppActionType.closeLabelPanel
                          })
                      }
                  }}
        ></ListItem>
    )
}