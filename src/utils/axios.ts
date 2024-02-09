import axios from 'axios';
import { SERVER_URL } from '../app_constants';
import { loader, popUpSecretHandler } from '~utils/helpers';
import { SERVER } from '~interfaces/index';

export const serverAPI = axios.create({baseURL: SERVER_URL});
serverAPI.interceptors.request.use(async (config)=>{
  const controller = new AbortController();
  if(config.url?.includes('auth/')){
    config.withCredentials = true;
  } else {
    const token = await loader(controller);
    if(token) {
      config.headers.setAuthorization(token);
    }     
    
  }
  return {...config, signal: controller.signal};
});
serverAPI.interceptors.response.use((response)=> {
  const {url, method} = response.config;
  if((url?.includes(SERVER.SECRET_SUBSCRIPTION)) || (url?.includes(SERVER.SECRET) && method==='post')){
   popUpSecretHandler.setPopUpTimers();
  }
  return response;
});
serverAPI.interceptors.response.use((response)=> response, (error) => {
  if(error.code === "ERR_CANCELED") {
    return Promise.resolve({status: 499});
  }
  return Promise.reject((error));
});
