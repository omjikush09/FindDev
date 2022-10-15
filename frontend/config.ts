import Axios from "axios";
import { SERVER_URL } from "./config.keys";




export const backend =Axios.create({
    baseURL:SERVER_URL,
    withCredentials: true
  })


