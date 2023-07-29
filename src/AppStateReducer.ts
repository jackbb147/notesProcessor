export enum AppActionType
{
    setActiveNodeID,
    closeLabelPanel,
    openLabelPanel,
    toggleLabelPanel
}


export type AppAction =
    | {type: AppActionType.setActiveNodeID, id: string}
    | {type: AppActionType.closeLabelPanel}
    | {type:AppActionType.openLabelPanel}
    | {type: AppActionType.toggleLabelPanel}

export interface AppState
{
    activeNodeID: string|undefined,
    LabelPanelClosed: boolean
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
    }
}