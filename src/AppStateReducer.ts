export enum AppActionType
{
    setActiveNodeID,
    setActiveCollection,
    closeLabelPanel,
    openLabelPanel,
    toggleLabelPanel,

}


export type AppAction =
    | {type: AppActionType.setActiveNodeID, id: string}
    | {type: AppActionType.closeLabelPanel}
    | {type:AppActionType.openLabelPanel}
    | {type: AppActionType.toggleLabelPanel}
    | {type: AppActionType.setActiveCollection, activeCollection: Collections}

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
}


export function AppStateReducer(draft: AppState, action: AppAction)
{
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
    }
}