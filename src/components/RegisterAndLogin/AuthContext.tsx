import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";



export const UserContext = createContext(null);

export const SetUserContext = createContext<any>(null);

export const ActiveUserProvider = ({children}:{
    children: React.ReactNode
}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{

    }, [])

    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}