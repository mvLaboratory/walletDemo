import axios from "axios";

export const GetRequest = (endpoint, auth) => {
    return axios.get(process.env.REACT_APP_API_PREFIX + endpoint, 
        {
            headers: {"Authorization": `Bearer ${auth.getAccessToken()}`}
        })
}

export const PostRequest = (endpoint, data, auth) => {
    return axios.post(process.env.REACT_APP_API_PREFIX + endpoint, data,
        { 
            headers: {"Authorization": `Bearer ${auth.getAccessToken()}`, "Content-Type": "application/json; charset=utf-8" },
        })
}
