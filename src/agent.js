import axios from 'axios';
// import { RECORD_LIMIT } from './constants/pagination';

const API_ROOT = process.env.NODE_ENV === 'production' ? '' : 'http://127.0.0.1:3000'; // 104.215.141.154     127.0.0.1

axios.defaults.baseURL = API_ROOT;
axios.defaults.timeout = 4000;

const setToken = (token) => {
  //  console.log(token);
  axios.defaults.headers.common = { Token: token };
};
const responseBody = (response) => {
  //  console.debug('RESPONSE', response);
  return response;
};

const requests = {
  del: (url) => axios.del(`${url}`).then(responseBody),
  get: (url) => axios.get(`${url}`).then(responseBody),
  // getAndPushToUrl: url => superagent.get(`${url}`).use(tokenPlugin).then(responseBody),
  getPaginated: (url, pageNum) => axios
    .get(`${url}`)
    .set('page_num', pageNum)
    .then(responseBody),
  put: (url, body) => axios.put(`${url}`, body).then(responseBody),
  post: (url, body) => axios.post(`${url}`, body).then(responseBody),
  postFile: (url, key, file) => {
    const formData = new FormData();
    formData.append(key, file);
    return axios
      .post(`${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(responseBody);
  },
};

const Auth = {
  login: (data) => requests.post('/user/login', data),
  register: (data) => requests.post('/user/register', data),
};
const ProfilePage = {
  getUserDetails : () => requests.get('/user/usersDetails'),
  uploadProject :(data) => requests.post('/projects/upload',data),
  getUsersProjects :() => requests.get('/projects/get_users_projects'),
  deletetProject :(data) => requests.post('/projects/delete',data),
  getAllProjects :() => requests.get('/projects/get_all_projects')
}

export default {
  Auth,
  setToken,
  ProfilePage,
  requests,
  
};
