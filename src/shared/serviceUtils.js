import axios from "axios";
import qs from "qs";

export const GetRequest = (endpoint, auth, extraHeaders, filterBody) => {
    return axios.get(process.env.REACT_APP_API_PREFIX + endpoint,
        {
            headers: {"Authorization": `Bearer ${auth.getAccessToken()}`, ...extraHeaders},
            params: filterBody,
            paramsSerializer: params => {
                return qs.stringify(params, { allowDots: true })
              }
        })
}

export const PostRequest = (endpoint, data, auth) => {
    return axios.post(process.env.REACT_APP_API_PREFIX + endpoint, data,
        { 
            headers: {"Authorization": `Bearer ${auth.getAccessToken()}`, "Content-Type": "application/json; charset=utf-8" },
        })
}

export const PutRequest = (endpoint, data, auth) => {
    return axios.put(process.env.REACT_APP_API_PREFIX + endpoint, data,
        { 
            headers: {"Authorization": `Bearer ${auth.getAccessToken()}`, "Content-Type": "application/json; charset=utf-8" },
        })
}
