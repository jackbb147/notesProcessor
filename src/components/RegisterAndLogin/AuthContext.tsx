import React, {createContext, Dispatch, SetStateAction, useState} from "react";



export const UserContext = createContext(null);

export const SetUserContext = createContext<Dispatch<SetStateAction<null>>|null>(null);

export const ActiveUserProvider = ({children}:{
    children: React.ReactNode
}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={user}>
            <SetUserContext.Provider value={setUser}>
                {children}
            </SetUserContext.Provider>
        </UserContext.Provider>
    )
}