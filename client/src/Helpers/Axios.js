import axios from 'axios'
export const guest = axios.create({
    baseURL: 'http://localhost:5000/api',

});

// export const user = axios.create({
//     baseURL: 'https://basobaas.com/api',
//     headers: {
//         Authorization: `Bearer ${cookies.get('token')}`,
//     },
// });