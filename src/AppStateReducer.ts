export enum AppActionType
{
    setActiveNodeID,
    setActiveCollection,
    closeLabelPanel,
    openLabelPanel,
    toggleLabelPanel,
    setShowRecoverNodePopup

}


export type AppAction =
    | {type: AppActionType.setActiveNodeID, id: string|undefined}
    | {type: AppActionType.closeLabelPanel}
    | {type:AppActionType.openLabelPanel}
    | {type: AppActionType.toggleLabelPanel}
    | {type: AppActionType.setActiveCollection, activeCollection: Collections}
    | {type: AppActionType.setShowRecoverNodePopup, show: boolean}


export enum Collections
{
    All,
    RecentlyDeleted,
    Tag
}


export interface AppState
{
    activeNodeID: string|undefined,
    activeCollection: Collections,
    LabelPanelClosed: boolean,
    showRecoverNodePopup: boolean
}


export function AppStateReducer(draft: AppState, action: AppAction)
{
    // console.log(`dispatched: ${JSON.stringify(action)}`)
    switch (action.type)
    {
        case AppActionType.setActiveNodeID:
        {
            draft.activeNodeID = action.id;
            break;
        }
        case AppActionType.closeLabelPanel:
        {
            draft.LabelPanelClosed = true;
            break;
        }
        case AppActionType.openLabelPanel:
        {
            draft.LabelPanelClosed = false;
            break;
        }
        case AppActionType.toggleLabelPanel:
        {
            draft.LabelPanelClosed = !draft.LabelPanelClosed;
            break;
        }

        case AppActionType.setActiveCollection:
        {
            draft.activeCollection = action.activeCollection;
            break;
        }

        case AppActionType.setShowRecoverNodePopup:
        {
            draft.showRecoverNodePopup = action.show;
            break;
        }
    }
}