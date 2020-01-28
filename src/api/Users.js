import axios from 'axios';
import { API } from '../properties/api';

const { post } = axios;

export const getWorkClubUsers = async (body) => {
    const URL = `${API.Admin}workclubUser/workclub-users`;
    console.log(URL);
    return await post(URL, body)
        .then((res) => {
            return res.data.data;
        })
        .catch(e => {
            return {};
        })
}