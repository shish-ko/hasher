import axios from 'axios';
import { SERVER_URL } from '../constants';
import { loader } from '~utils/helpers';

export const serverAPI = axios.create({baseURL: SERVER_URL});
serverAPI.interceptors.request.use(async (config)=>{
  const controller = new AbortController();
  if(config.url?.includes('auth/')){
    config.withCredentials = true;
  } else {
    const token = await loader(controller);
    // const token = window.localStorage.getItem('Bearer')?.split(' ')[1];
    if(token) {
      config.headers.setAuthorization(token);
    }     
    
  }
  return {...config, signal: controller.signal};
});
serverAPI.interceptors.response.use((response)=> response, (error) => {
  if(error.code === "ERR_CANCELED") {
    return Promise.resolve({status: 499});
  }
  return Promise.reject((error));
});
