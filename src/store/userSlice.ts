import { createSlice } from "@reduxjs/toolkit";
import { INITIAL_NAME } from "app_constants";
import { IAccountInfo, IToken, IUserSecrets } from "~interfaces/index";

interface IUserSlice {
  id?: number,
  name: string,
  secrets: IUserSecrets,
  isLogged: boolean,
  authToken?: string,
  newSecrets: number,
  userPic?: string
}

const initialState: IUserSlice = {
  isLogged: false,
  name: '',
  secrets: {availableSecrets:[], futureSecrets: []},
  newSecrets: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSecrets: (state, {payload}: {payload: IUserSecrets}) => {
      state.secrets=payload;
    }, 
    addNewSecret: (store) => {
      store.newSecrets+=1;
    },
    setAuthToken: (state, {payload}: {payload: string}) => {
      state.authToken = payload;
    },
    setUserData: (state, {payload}: {payload: IAccountInfo & Partial<IToken>}) => {
      if(payload.token){
        state.authToken=payload.token;
      }
      state.id=payload.id;
      state.name=payload.name;
      state.isLogged=true;
    },
    removeUserData: (state)=> {
      state.authToken=undefined;
      state.id=undefined;
      state.name='';
      state.isLogged=false;
    }
  }
});
export const { setUserData, setUserSecrets, removeUserData, setAuthToken, addNewSecret } = userSlice.actions;
export {userSlice};

