import {useAppState, useDispatch} from "../../../hooks/AppStateAndGraphhooks";
import React from "react";
import {AppActionType} from "../../../reducers/AppStateReducer";
export function ToLogin()
{
    const AppState = useAppState()
    const dispatch = useDispatch();
    const handleCreateAccountBtnClick = (e: React.MouseEvent)=>
    {
        //     TODO
        dispatch({
            type: AppActionType.setShowRegisterPage,
            show: false
        })

        dispatch({
            type: AppActionType.setShowLoginPage,
            show: true
        })
    }
    return (
        <div className={"text-center mt-10 font-bold"}>
            Already have an account?
            <span
                className={`
                            text-button
                            `}
                onClick={handleCreateAccountBtnClick}> Log in</span>
        </div>
    )
}

export function ToRegister()
{
    const AppState = useAppState()
    const dispatch = useDispatch();
    const handleCreateAccountBtnClick = (e: React.MouseEvent)=>
    {
        //     TODO
        dispatch({
            type: AppActionType.setShowLoginPage,
            show: false
        })

        dispatch({
            type: AppActionType.setShowRegisterPage,
            show: true
        })
    }
    return (
        <div className={"text-center mt-10 font-bold"}>
            Looking to
            <span
                className={`
                            text-button
                            `}
                onClick={handleCreateAccountBtnClick}> create an account</span> ?
        </div>
    )
}