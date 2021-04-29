import axios from 'axios';

function createAxiosAuthMiddleware() {
  return ({ getState }) => (next) => (action) => {

    console.log("selected",getState().organisations.selected)
    axios.defaults.headers.common['X-Organisation'] = getState().organisations.selected;
    axios.defaults.baseURL = window.REACT_APP_API_URL;
    axios.defaults.withCredentials = true;
    return next(action);
  };
}

const axiosAuth = createAxiosAuthMiddleware();

export default axiosAuth;
