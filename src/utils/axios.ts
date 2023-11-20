import axios from 'axios';
import { SERVER_URL } from 'constants';
import { loader } from '~utils/helpers';

export const serverAPI = axios.create({baseURL: SERVER_URL});
serverAPI.interceptors.request.use(async (config)=>{
  const controller = new AbortController();
  if(config.url?.includes('auth/')){
    config.withCredentials = true;
  } else {
    await loader(controller);
    const token = window.localStorage.getItem('Bearer')?.split(' ')[1];
    if(token) {
      config.headers.setAuthorization(token);
    }     
    
  }
  return {...config, signal: controller.signal};
});
