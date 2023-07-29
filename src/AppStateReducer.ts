export enum AppActionType
{
    setActiveNodeID,
}


export type AppAction =
    | {type: AppActionType.setActiveNodeID, id: string}

export interface AppState
{
    activeNodeID: string|undefined
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
    }
}