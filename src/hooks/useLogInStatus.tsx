import { axiosCustomInstance } from "../api/AxiosCustomInstance";
import { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import { useIsLoggedInQuery, useGetUsernameQuery } from "../api/apiSlice";

export function useLogInStatus(): [boolean, string | null] {
  const { data: loginStatus, error, isLoading } = useIsLoggedInQuery();
  const { data: userName } = useGetUsernameQuery();
  if (!userName) debugger;

  return [loginStatus ?? false, userName ?? null];
}
