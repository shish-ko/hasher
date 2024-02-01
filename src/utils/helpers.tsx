import { SECOND, TEST_TOKEN } from "../app_constants";
import jwtDecode from "jwt-decode";
import { ESecretType,  ITokenPayload, IUserFetchRes } from "~interfaces/index";
import { serverAPI } from "./axios";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { IRootState, setAuthToken, setIsLogin } from "store/store";
import { AxiosError, HttpStatusCode } from "axios";
import { setPopupMessage } from "store/popUpSlice";
import { TypographyCountdown } from "~comps/UI_components/AppTypography";
import { CountdownTimeDelta } from "react-countdown";
import { TypographyProps } from "@mui/material";


let store: undefined | ToolkitStore<IRootState>;

export const injectStore = (_store: ToolkitStore<IRootState>) => {
  store = _store;
};

export async function loader(controller?: AbortController) {
  if (import.meta.env.VITE_AUTH_FREE) return TEST_TOKEN;
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
          store?.dispatch(setPopupMessage({ type: 'error', message: 'Session expired. Log in again' }));
          store?.dispatch(setAuthToken(''));
          store?.dispatch(setIsLogin(false));
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

export function getTypeImgUrl (type: ESecretType,): string {
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

export function loginValidator(login: string) {
  if (!login) return 'Provide e-mail';
  return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(login) || 'Invalid e-mail';
}
export function passwordValidator(password: string) {
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) return 'Minimum eight characters, at least one letter and one number';
  return true;
}

export const get_MOCK_USER_SECRETS = (): IUserFetchRes=> {
  const res: IUserFetchRes = {availableSecrets: [], futureSecrets: [] };
  for (const type of Object.keys(ESecretType)) {
    res.availableSecrets.push({
      id: Math.random().toString(),
      availableAt: new Date().toISOString(),
      type: type as ESecretType,
      title: Math.random().toString(),
      createdAt: new Date(Date.now() - 1000000).toISOString(),
      url: Math.random().toString(),
      userId: 1,
      description: Math.random().toString(),
    });
  }
  for (const type of Object.keys(ESecretType)) {
    res.futureSecrets.push({
      id: Math.random().toString(),
      availableAt: new Date(Date.now()+1000000).toISOString(),
      type: type as ESecretType,
      title: Math.random().toString(),
      createdAt: new Date(Date.now() - 1000000).toISOString(),
      userId: 1,
      url: null,
      description: null,
    });
  }
  return res;
};

export const countdownRenderer =(typographyProps?: TypographyProps) => ({ hours, minutes, seconds, milliseconds, completed }: CountdownTimeDelta) => {
  if(completed) return <TypographyCountdown  {...typographyProps} milliseconds={true}>--:--:---</TypographyCountdown>;
  if (hours) {
    return <TypographyCountdown {...typographyProps}>{hours}:{minutes}:{seconds.toString().padStart(2, '0')}</TypographyCountdown>;
  } 
  return <TypographyCountdown {...typographyProps} milliseconds={true}>{minutes}:{seconds.toString().padStart(2, '0')}:{milliseconds.toString().padStart(3, '0')}</TypographyCountdown >;
};
