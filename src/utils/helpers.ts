import { SECOND, TEST_TOKEN } from "constants";
import jwtDecode from "jwt-decode";
import { ITokenPayload } from "~interfaces/index";
import { serverAPI } from "./axios";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { IRootState, setAuthToken, setIsLogin } from "store/store";
import { AxiosError, HttpStatusCode } from "axios";
import { hidePopUp, setPopupMessage } from "store/popUpSlice";


let store: undefined | ToolkitStore<IRootState>;

export const injectStore = (_store: ToolkitStore<IRootState>) => {
  store = _store;
};

export async function loader(controller?: AbortController) {
  if(import.meta.env.VITE_AUTH_FREE) return TEST_TOKEN; 
  // const oldToken = window.localStorage.getItem('Bearer');
  const oldToken = store?.getState().user.authToken;
  if(!oldToken) return;
  const {exp} = jwtDecode<ITokenPayload>(oldToken);
  if((exp * 1000 - SECOND) < Date.now()) {
    try {
      console.log('loader '+ Date.now());
      const res = await serverAPI.get('auth/refresh-tokens');
      const {token: newToken}: {token: string} = res.data;
      console.log(newToken);
      store?.dispatch(setAuthToken(newToken));
      return newToken;
    } catch (e) {
      if(e instanceof AxiosError && e.response?.status === HttpStatusCode.Unauthorized) {
        controller?.abort();
        store?.dispatch(setPopupMessage({type: 'alert', message: 'Session expired. Log in again'}));
        store?.dispatch(setAuthToken(''));
        store?.dispatch(setIsLogin(false));
        setTimeout(()=>store?.dispatch(hidePopUp()), 1500);
      }
      return;
    }
  } else {
    return oldToken;
  }
}
