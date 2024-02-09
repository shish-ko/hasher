import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { hidePopUp, setPopupMessage } from "store/popUpSlice";
import { removeUserData, setUserData } from "store/userSlice";
import { serverAPI } from "./axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AxiosError } from "axios";
import { IAppDispatch, IRootState } from "store/store";
import jwtDecode from "jwt-decode";
import { ITokenPayload } from "~interfaces/index";
import { popUpSecretHandler } from "./helpers";

type DispatchFunc = () => IAppDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;

export const usePopUp = () => {
  const dispatch = useAppDispatch();

  function active(message: string, type: 'success' | 'error' | 'info' = 'info') {
    dispatch(setPopupMessage({ message, type }));
    setTimeout(() => { dispatch(hidePopUp()); }, 2500);
  }
  return active;
};

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  function setUser(token: string) {
    const payload = jwtDecode<ITokenPayload>(token);
    dispatch(setUserData({...payload, authToken: token }));
    popUpSecretHandler.setPopUpTimers();
  }
  async function logOutUser() {
    dispatch(removeUserData());
    await serverAPI.get('auth/logout');
    popUpSecretHandler.removePopUpTimers();
    navigate('/');
  }
  return { setUser, logOutUser };
};

interface IUseServerFetchOptions {
  redirectOnError?: string,
}
export const useServerFetch = <T>(url: string, { redirectOnError }: IUseServerFetchOptions = {}) => {
  const [searchParams, setSearchParams] = useState<URLSearchParams>();
  const [res, setRes] = useState<T>();
  const [fetch, setFetch] = useState(false);
  const showPopUp = usePopUp();
  const navigate = useNavigate();

  const isDevMode = import.meta.env.VITE_AUTH_FREE;

  const refetch = (newSearchParams?: URLSearchParams) => {
    if (newSearchParams) {
      setSearchParams(newSearchParams);
    }else {
      setFetch(!fetch);
    }
  };

  useEffect(() => {
    async function fetcher() {
      try {
        setRes(undefined);
        const { data } = await serverAPI.get<T>(url, {params: searchParams});
        setRes(data);
      } catch (e) {
        if (e instanceof AxiosError) {
          showPopUp(e.response?.data.message || e.message, 'error');
          if (redirectOnError && !isDevMode) {
            setTimeout(() => {
              navigate(redirectOnError);
            }, 0);
          }
        }
      }
    }
    fetcher();
  }, [fetch, searchParams]);

  return { res, refetch, setRes };
};
