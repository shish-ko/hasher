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
  errorRedirect?: string,
}
export const useServerFetch = <T>(url: string, {errorRedirect}: IUseServerFetchOptions={}) => {
  const [res, setRes] = useState<T>();
  const [reloadNumber, setReloadNumber] = useState(0);
  const showPopUp = usePopUp();
  const navigate = useNavigate();
  
  const refetch =()=> {
      setReloadNumber(reloadNumber+1);
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
          if(errorRedirect) {
            setTimeout(() => {
              navigate(errorRedirect);
            }, 0);
          }       
        }
      }
    }
    fetcher();
  }, [reloadNumber]);
  return {res, refetch, setRes};
};
