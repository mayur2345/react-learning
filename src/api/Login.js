import axios from 'axios';
import { API } from '../properties/api';
import { Observable } from 'rxjs';

const { post } = axios;

export const userLogin = (body) => {
    const URL = `${API.Admin}/workclubUser/sign-in`;
    localStorage.clear();
    return Observable.create(obs => {
        return post(URL, body)
            .then((result) => {
                if (result.data.code === 200) {
                    obs.next(result.data);
                    obs.complete();
                } else {
                    obs.error(result.data);
                }
            })
            .catch(error => {
                obs.error(error);
            })
    });
};

// export const userLogin = async (body) => {
//     const URL = `${API.Admin}/workclubUser/sign-in`;

//     return await post(URL, body)
//         .then((res) => {
//             console.log('GetClient: ', res.data);
//             return res.data.data;
//         })
//         .catch(e => {
//             console.log("Hello : "+e);
//             return {};
//         })
// }