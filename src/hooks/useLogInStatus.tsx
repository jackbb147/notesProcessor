import { axiosCustomInstance } from "../api/AxiosCustomInstance";
import { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { useIsLoggedInQuery, useGetUsernameQuery } from "../api/apiSlice";

export function useLogInStatus(): [boolean, string | null] {
  const { data: loginStatus, error, isLoading } = useIsLoggedInQuery();
  const {
    data: userName,
    isLoading: loadingUserName,
    isSuccess: userNameSuccess,
  } = useGetUsernameQuery();
  // if (loginStatus && !userName) console.warn("userName is null. ");
  // useEffect(() => {
  //   if (isLoading || !userNameSuccess) return;
  //   let usern = userName;
  //   debugger;
  // }, [loadingUserName]);
  useEffect(() => {
    if (!loginStatus) return;
    // debugger;

    async function login() {
      // var res = await axios.get("/GetCurrentUser");
      const u = userName;
      // debugger;
    }
    login();
  }, [loginStatus]);
  return [loginStatus ?? false, userName ?? null];
}
