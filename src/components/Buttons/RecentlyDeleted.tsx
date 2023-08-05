import {AppActionType, Collections} from "../../reducers/AppStateReducer";
import {ListItem} from "./ListItem";
import React from "react";
import {useAppState, useDispatch} from "../../reducers/hooks";
import {useMediaQuery} from "react-responsive";

export function RecentlyDeleted()
{
    const state = useAppState()
    const dispatch = useDispatch()
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return (
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