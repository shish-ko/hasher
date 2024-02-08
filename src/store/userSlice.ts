import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { ITokenPayload, IUserSecrets } from "~interfaces/index";

interface IUserSlice {
  id?: number,
  name: string,
  secrets: IUserSecrets,
  isLogged: boolean,
  authToken?: string,
  newSecrets: number,
}

const initialState: IUserSlice = {
  isLogged: false,
  name: 'anonymous',
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
    setAuthToken: (state, {payload}: {payload: string}) => {
      state.authToken = payload;
    },
    setUserData: (state, {payload}: {payload: Pick<IUserSlice, 'id' | 'name' | 'authToken'>}) => {
      state.authToken=payload.authToken;
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
export const {setUserData, setUserSecrets, removeUserData, setAuthToken } = userSlice.actions;
export {userSlice};

