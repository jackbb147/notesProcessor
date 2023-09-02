import React, {useEffect, useState} from "react";
import {SetUserContext, UserContext} from "./AuthContext";
import {useLogInStatus} from "../../hooks/useLogInStatus";

export const ActiveUserProvider = ({children}:{
    children: React.ReactNode
}) => {
    const [isLoggedIn, loggedInUserName] =  useLogInStatus();
    const [user, setUser] = useState(loggedInUserName);

    useEffect(()=>{
        if(isLoggedIn)
        {
            setUser(loggedInUserName);
        }
    }, [isLoggedIn, loggedInUserName])

    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}