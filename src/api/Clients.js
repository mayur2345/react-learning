import axios from 'axios';
import { API } from '../properties/api';

const { post } = axios;

export const getClients = async (body, headers) => {
    const URL = `${API.Admin}client/get-client`;
    console.log(URL);
    return await post(URL, body,{
        headers: headers
    })
        .then((res) => {
            return res.data.data;
        })
        .catch(e => {
            return {};
        })
}

export const createClient = async (data) => {
    const URL = `${API.Admin}client/create-client`;
    return await post(URL, data)
        .then((res) => {
            // user has been edited, everything OK
            return true;
        })
        .catch((e) => {
            // error occured, not OK
            return false;
        })
}

export const editClient = async (data) => {
    const URL = `${API.Admin}client/edit-client`;
    return await post(URL, data)
        .then((res) => {
            // user has been edited, everything OK
            return true;
        })
        .catch((e) => {
            // error occured, not OK
            return false;
        })
}
