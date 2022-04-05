import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-3ab99-default-rtdb.firebaseio.com/'
});

export default instance;