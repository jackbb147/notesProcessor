export enum AppActionType
{
    setActiveNodeID,
    setActiveCollection,
    closeLabelPanel,
    openLabelPanel,
    toggleLabelPanel,
    setShowRecoverNodePopup,
    toggleDarkMode,
    setActiveLabel,
    setShowLabelSelectorPopup,
    setShowSettingsPanel,
    setShowRegisterPage,
    setShowLoginPage,
    setIsLoggedIn
}


export type AppAction =
    | {type: AppActionType.setActiveNodeID, id: string|undefined}
    | {type: AppActionType.closeLabelPanel}
    | {type:AppActionType.openLabelPanel}
    | {type: AppActionType.toggleLabelPanel}
    | {type: AppActionType.setActiveCollection, activeCollection: Collections}
    | {type: AppActionType.setShowRecoverNodePopup, show: boolean}
    | {type: AppActionType.toggleDarkMode}
    | {type: AppActionType.setActiveLabel, label:string}
    | {type: AppActionType.setShowLabelSelectorPopup, show: boolean}
    | {type: AppActionType.setShowSettingsPanel, show: boolean}
    | {type: AppActionType.setShowRegisterPage, show: boolean}
    | {type: AppActionType.setShowLoginPage, show: boolean}
    | {type: AppActionType.setIsLoggedIn, isLoggedIn: boolean}


export enum Collections
{
    All,
    RecentlyDeleted,
    Label
}


export interface AppState
{
    activeNodeID: string|undefined,
    activeCollection: Collections,
    activeLabel:string|undefined,
    LabelPanelClosed: boolean,
    showRecoverNodePopup: boolean,
    darkModeOn: boolean,
    showLabelSelectorPopup: boolean,
    showSettingsPanel: boolean,
    showRegisterPage: boolean,
    showLoginPage: boolean,
    isLoggedIn: boolean
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

        case AppActionType.toggleDarkMode:
        {
            draft.darkModeOn = !draft.darkModeOn;
            break;
        }

        case AppActionType.setActiveLabel:
        {
            draft.activeCollection = Collections.Label;
            draft.activeLabel = action.label;
            break;
        }

        case AppActionType.setShowLabelSelectorPopup:
        {
            draft.showLabelSelectorPopup = action.show;
            break;
        }

        case AppActionType.setShowSettingsPanel:
        {
            draft.showSettingsPanel = action.show;
            break;
        }

        case AppActionType.setShowLoginPage:
        {
            draft.showLoginPage = action.show;
            break;
        }

        case AppActionType.setShowRegisterPage:
        {
            draft.showRegisterPage = action.show;
            break;
        }

        case AppActionType.setIsLoggedIn:
        {
            draft.isLoggedIn = action.isLoggedIn;
            break;
        }

    }
}