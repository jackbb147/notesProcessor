import React,{ createContext, useReducer,  } from 'react';
import {useImmerReducer} from "use-immer";
import {AppAction, AppState, AppStateReducer, Collections} from "../reducers/AppStateReducer";


export const AppStateContext = createContext<AppState|null>(null);

export const AppStateDispatchContext = createContext<React.Dispatch<AppAction>|null>(null);


export function AppStateProvider({ children}:{children: React.ReactNode}) {
    const [state, dispatch] = useImmerReducer<AppState, AppAction>(AppStateReducer, {
        activeNodeID: undefined,
        activeCollection: Collections.All,
        LabelPanelClosed: false,
        showRecoverNodePopup: false,
        darkModeOn: false
    });

    return (
        <AppStateContext.Provider value={state}>
            <AppStateDispatchContext.Provider value={dispatch}>
                {children}
            </AppStateDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}


