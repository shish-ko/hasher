import { createListenerMiddleware } from "@reduxjs/toolkit";
import { setUserData, setUserSecrets } from "./userSlice";
import { serverAPI } from "~utils/axios";
import { IFutureSecret, IUserSecrets, SERVER } from "~interfaces/index";
import { setPopupMessage } from "./popUpSlice";
import { IAppDispatch, IRootState } from "./store";

let popUpSecretHandler: SecretAvailabilityHandler;

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: setUserData, 
  effect: async (_, listenerApi) => {
    const { user } = listenerApi.getState() as IRootState;
    const { data } = await serverAPI.get<IUserSecrets>(SERVER.USER + user.id);
    // listenerApi.dispatch(setUserSecrets(data));
    popUpSecretHandler = new SecretAvailabilityHandler(data.futureSecrets, listenerApi.dispatch as IAppDispatch);
    popUpSecretHandler.setPopUpTimers();

  }
});


class SecretAvailabilityHandler {
  futureSecrets: IFutureSecret[];
  dispatch: IAppDispatch;
  popUpTimeouts: { timeoutID: NodeJS.Timeout, secretID: string }[];

  constructor(futureSecrets: IFutureSecret[], dispatch: IAppDispatch) {
    this.futureSecrets = futureSecrets;
    this.dispatch = dispatch;
    this.popUpTimeouts = [];
  }

  setPopUpTimers() {
    this.futureSecrets.forEach(futureSecret => this.setPopUpTimer(futureSecret));
  }

  private setPopUpTimer(futureSecret: IFutureSecret) {
    const timeout = new Date(futureSecret.availableAt).getTime() - Date.now();
    const timeoutID = setTimeout(() => {
      this.dispatch(setPopupMessage({ type: 'info', message: 'Secret is available now' }));
    }, timeout);
    this.popUpTimeouts.push({ timeoutID, secretID: futureSecret.id });
  }

  addFutureSecret(futureSecret: IFutureSecret) {
    this.futureSecrets.push(futureSecret);
    this.setPopUpTimer(futureSecret);
  }

  removeFutureSecret(futureSecret: IFutureSecret) {
    const timeout = this.popUpTimeouts.find((popUpTimout) => popUpTimout.secretID === futureSecret.id);
    clearTimeout(timeout?.timeoutID);
  }

  removePopUpTimers() {
    this.popUpTimeouts.forEach(timeout => clearTimeout(timeout.timeoutID));
  }

}

export { listenerMiddleware };
