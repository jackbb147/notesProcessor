
import {api} from "../Api/Api";
import {useEffect, useState} from "react";
import axios from "axios";
import dotenv from  'dotenv'

export function useLogInStatus():[boolean, string|null]
{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedInUserName, setLoggedInUserName] = useState<string|null>(null);

    useEffect(()=>{
        async function checkLogin()
        {
            // const envi= process.env;
            try{
                const response = await api.get("/isLoggedIn");
                if(response.status !== 200) throw new Error("[useLogInStatus] Failed to check login status; got status code: " + response.status);

                setIsLoggedIn(response.data);
                // debugger;
                if(response.data === false) return;
                const userName = await api.get("/GetCurrentUser");
                setLoggedInUserName(userName.data);
            }catch (e) {
                // debugger;
                alert(JSON.stringify(e, null, 2))
            }
        }
        checkLogin();

    }, [])

    return [isLoggedIn, loggedInUserName];
}