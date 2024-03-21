import { APP_URL_ORIGIN, ONE_HOUR, SECOND, TEST_TOKEN, TWENTY_FIFE_MB } from "../app_constants";
import jwtDecode from "jwt-decode";
import { ESecretType, IFutureSecret, ISecret, ITokenPayload, IUserSecrets, SERVER } from "~interfaces/index";
import { serverAPI } from "./axios";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { removeUserData, setAuthToken } from "store/userSlice";
import { AxiosError, HttpStatusCode } from "axios";
import { setPopupMessage } from "store/popUpSlice";
import { TypographyCountdown } from "~comps/UI_components/AppTypography";
import { CountdownTimeDelta, zeroPad } from "react-countdown";
import { TypographyProps } from "@mui/material";
import { IRootState } from "store/store";


let store: undefined | ToolkitStore<IRootState>;

export const injectStore = (_store: ToolkitStore<IRootState>) => {
  store = _store;
};

export async function loader(controller?: AbortController): Promise<string | undefined> {
  if (import.meta.env.VITE_AUTH_FREE) return TEST_TOKEN;
  const oldToken = store?.getState().user.authToken;
  if (!oldToken) { // e.d. after refresh, when no token at store but refresh token can be at cookies
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
          store?.dispatch(removeUserData());
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

export function getTypeImgUrl(type: ESecretType,): string {
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
      imgSrc = "/icons/doc.png";
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

export const get_MOCK_USER_SECRETS = (): IUserSecrets => {
  const res: IUserSecrets = { availableSecrets: [], futureSecrets: [] };
  for (const type of Object.keys(ESecretType)) {
    res.availableSecrets.push({
      id: Math.random().toString(),
      availableAt: new Date().toISOString(),
      type: type as ESecretType,
      title: Math.random().toString(),
      createdAt: new Date(Date.now() - 1000000).toISOString(),
      url: Math.random().toString(),
      userId: 1,
      views: 123,
      description: Math.random().toString(),
    });
  }
  for (const type of Object.keys(ESecretType)) {
    res.futureSecrets.push({
      id: Math.random().toString(),
      availableAt: new Date(Date.now() + 1000000).toISOString(),
      type: type as ESecretType,
      title: Math.random().toString(),
      createdAt: new Date(Date.now() - 1000000).toISOString(),
      userId: 1,
      views: 123,
      url: null,
      description: null,
    });
  }
  return res;
};

export const countdownRenderer = (typographyProps?: TypographyProps) => ({ days, hours, minutes, seconds, milliseconds, completed, total }: CountdownTimeDelta) => {
  if (completed) return <TypographyCountdown  {...typographyProps} milliseconds={true}>--:--:---</TypographyCountdown>;
  if (total > ONE_HOUR) {
    return <TypographyCountdown {...typographyProps}>{days}d:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</TypographyCountdown>;
  }
  return <TypographyCountdown {...typographyProps} milliseconds> {zeroPad(minutes)}:{zeroPad(seconds)}:{zeroPad(milliseconds, 3)}</TypographyCountdown >;
};

export const fileValidator =(files: File[]) => {
  if (files[0].size > TWENTY_FIFE_MB) {
    return 'File size should be less than 25Mb';
  }
  return true;
};

class SecretAvailabilityHandler {
  private userSecretsTimeouts: NodeJS.Timeout[];
  private subscribedSecretsTimeouts: NodeJS.Timeout[];

  constructor() {
    this.userSecretsTimeouts = [],
    this.subscribedSecretsTimeouts = [];
  }

  async setPopUpTimers() {
    const userID = store?.getState().user.id;
    if (userID) {
      const { data } = await serverAPI.get<IUserSecrets>(SERVER.USER + userID);
      this.removePopUpTimers();
      data.futureSecrets.forEach((secret) => {
        const timeout = new Date(secret.availableAt).getTime() - Date.now();
        const timeoutID = setTimeout(() => {
          store?.dispatch(setPopupMessage({ type: 'info', message: 'Secret is available now' }));
        }, timeout);
        this.userSecretsTimeouts.push(timeoutID);
      });
      data.subscribedTo?.futureSecrets.forEach((secret) => {
        const timeout = new Date(secret.availableAt).getTime() - Date.now();
        const timeoutID = setTimeout(() => {
          store?.dispatch(setPopupMessage({ type: 'info', message: 'Secret is available now' }));
        }, timeout);
        this.subscribedSecretsTimeouts.push(timeoutID);
      });
    }
  }

  removePopUpTimers() {
    this.userSecretsTimeouts.forEach(timeout => clearTimeout(timeout));
    this.subscribedSecretsTimeouts.forEach(timeout => clearTimeout(timeout));
  }

}

export const popUpSecretHandler = new SecretAvailabilityHandler();

export const getSecretTypeImageURL = (type: ESecretType) => {
  return `${APP_URL_ORIGIN}/icons/${type.toLowerCase()}.png`;
};

export function getSecretExpiredAnnotation(secret: ISecret|IFutureSecret, plusChar: string = '+' ) {
  const availableAtDateObj = new Date(secret.availableAt);
  let result = `This ${secret.type.toLowerCase()} will become available at ${availableAtDateObj.toLocaleString()} ${getOffsetString(availableAtDateObj, plusChar)}`;
  if(secret.url) {
    result = `This ${secret.type.toLowerCase()} became available at ${availableAtDateObj.toLocaleString()} ${getOffsetString(availableAtDateObj, plusChar)}`;
  } 
  return result;
}
export function getOffsetString(date: Date, plusChar: string = '+' ) {
  const sign = (date.getTimezoneOffset() > 0) ? "-" : plusChar;
  const offset = Math.abs(date.getTimezoneOffset());
  const hours = pad(Math.floor(offset / 60));
  const minutes = pad(offset % 60);
  return `(UTC ${sign}${hours}:${minutes})`;
}
function pad(value: number) {
  return value < 10 ? '0' + value : value;
}
