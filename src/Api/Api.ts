import axios from "axios";
import dotenv from  'dotenv'


export const api = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: true,
});