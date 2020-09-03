import axios from "axios";

export const GetRequest = (endpoint, auth) => {
    return axios.get(process.env.REACT_APP_API_PREFIX + endpoint, {headers: {"Authorization": `Bearer ${auth.getAccessToken()}`}})
}

