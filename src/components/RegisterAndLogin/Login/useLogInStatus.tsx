
import {api} from "../../../Api/Api";
import {useEffect, useState} from "react";
import axios from "axios";
import dotenv from  'dotenv'

export function useLogInStatus()
{

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(()=>{
        async function checkLogin()
        {
            // const envi= process.env;
            const response = await api.get("/isLoggedIn");
            if(response.status !== 200) throw new Error("[useLogInStatus] Failed to check login status; got status code: " + response.status);
            setIsLoggedIn(response.data);
        }
        checkLogin();

    }, [])

    return isLoggedIn;
}