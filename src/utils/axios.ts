
import axios from 'axios';
import { SERVER_URL } from 'constants';

export const serverAPI = axios.create({baseURL: SERVER_URL});
serverAPI.interceptors.request.use((config)=>{
  if(config.url?.includes('/auth/')){
    config.withCredentials = true;
  } else {
    const token = window.localStorage.getItem('Bearer')?.split(' ')[1];
    if(token) {
      config.headers.setAuthorization(token);
    }     
    
  }
  console.log(config.headers.Authorization);
  return config;
});
