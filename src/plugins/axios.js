import axios from 'axios';

const http = axios.create({
    baseURL: 'https://library-wda.herokuapp.com/api/v1'
    //baseURL: 'http://localhost:8080/api/v1',
});

export default http;