import { SECOND, TEST_TOKEN } from "../constants";
import jwtDecode from "jwt-decode";
import { ISecret, ITokenPayload, TSecretType } from "~interfaces/index";
import { serverAPI } from "./axios";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { IRootState, setAuthToken, setIsLogin } from "store/store";
import { AxiosError, HttpStatusCode } from "axios";
import { hidePopUp, setPopupMessage } from "store/popUpSlice";
import { AudioSecret } from "~comps/Secrets/AudioSecret";
import { VideoSecret } from "~comps/Secrets/VideoSecret";
import { DocSecret } from "~comps/Secrets/DocSecret";
import { PhotoSecret } from "~comps/Secrets/PhotoSecret";


let store: undefined | ToolkitStore<IRootState>;

export const injectStore = (_store: ToolkitStore<IRootState>) => {
  store = _store;
};

export async function loader(controller?: AbortController) {
  // if (import.meta.env.VITE_AUTH_FREE) return TEST_TOKEN;
  const oldToken = store?.getState().user.authToken;
  if (!oldToken) {
    try {
      return await refreshToken();
    } catch {
      controller?.abort();
      return;
    }
  } else {
    const { exp } = jwtDecode<ITokenPayload>(oldToken);
    if ((exp * 1000 - SECOND) < Date.now()) {
      try {
        return await refreshToken();
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === HttpStatusCode.Unauthorized) {
          controller?.abort();
          store?.dispatch(setPopupMessage({ type: 'alert', message: 'Session expired. Log in again' }));
          store?.dispatch(setAuthToken(''));
          store?.dispatch(setIsLogin(false));
          setTimeout(() => store?.dispatch(hidePopUp()), 1500);
        }
        return;
      }
    } else {
      return oldToken;
    }
  }

  async function refreshToken() {
    console.log('refresh tokens');
    const res = await serverAPI.get('auth/refresh-tokens');
    const { token: newToken }: { token: string } = res.data;
    store?.dispatch(setAuthToken(newToken));
    return newToken;
  }
}

export function getTypeImgUrl (type: TSecretType): string {
  let imgSrc;
  switch (type) {
    case 'AUDIO':
      imgSrc = '/icons/audio.png';
      break;
    case 'VIDEO':
      imgSrc = "/icons/video.png";
      break;
    case 'DOC':
      imgSrc = "/icons/doc.png";
      break;
    case 'PHOTO':
      imgSrc = "/icons/photo.png";
      break;
    default: 
      imgSrc="/icons/doc.png";
      break;
  }
  return imgSrc;
}

export function getSecretComponent(secret: ISecret, expiredSecretHandler: ()=>void, key?: string) {
  switch (secret.type) {
    case 'AUDIO':
      return <AudioSecret {...secret} countdownHandler={expiredSecretHandler} key={key}/>;        
    case 'VIDEO':
      return <VideoSecret {...secret} countdownHandler={expiredSecretHandler} key={key}/>;
    case 'DOC':
      return <DocSecret {...secret} countdownHandler={expiredSecretHandler} key={key}/>;
    case 'PHOTO':
      return <PhotoSecret {...secret} countdownHandler={expiredSecretHandler} key={key}/>;
    default:
      break;
  }
}
