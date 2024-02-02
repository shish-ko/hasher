import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { hidePopUp, setPopupMessage } from "store/popUpSlice";
import { IAppDispatch, IRootState, setAuthToken, setIsLogin, setUserData } from "store/store";
import { serverAPI } from "./axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AxiosError } from "axios";

type DispatchFunc = () => IAppDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;

export const usePopUp = () => {
  const dispatch = useAppDispatch();

  function active(message: string, type: 'alert' | 'error' | 'info' = 'info') {
    dispatch(setPopupMessage({message, type}));
    setTimeout(()=> {dispatch(hidePopUp());}, 2500);
  }
  return active;
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function setUser (token: string) {
    dispatch(setUserData (token));
  } 
  function userIsLoggedIn() {
    dispatch(setIsLogin(true));
  }
  async function logOutUser() {
    dispatch(setIsLogin(false));
    dispatch(setAuthToken(''));
    await serverAPI.get('auth/logout');
    navigate('/');
  }
  return {setUser, userIsLoggedIn, logOutUser};
};

interface IUseServerFetchOptions {
  redirectOnError?: string,
}
export const useServerFetch = <T>(url: string, {redirectOnError}: IUseServerFetchOptions={}) => {
  const [res, setRes] = useState<T>();
  const [fetch, setFetch] = useState(false);
  const showPopUp = usePopUp();
  const navigate = useNavigate();

  const isDevMode = import.meta.env.VITE_AUTH_FREE;

  const refetch =()=> {
      setFetch(!fetch);
  };

  useEffect(()=> {
    async function fetcher() {
      try{
        setRes(undefined);
        const {data}= await serverAPI.get<T>(url);
        setRes(data);
      } catch (e) {
        if(e instanceof AxiosError) {
          showPopUp(e.response?.data.message || e.message, 'error');   
          if(redirectOnError && !isDevMode ) {
            setTimeout(() => {
              navigate(redirectOnError);
            }, 0);
          }       
        }
      }
    }
    fetcher();
  }, [fetch]);
  
  return {res, refetch, setRes};
};
