import axios from "axios";

export const http = axios.create({
    baseURL: "https://library-wda.herokuapp.com/"
})