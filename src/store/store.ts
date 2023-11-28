import { configureStore, createSlice } from "@reduxjs/toolkit";
import { popUpSlice } from "./popUpSlice";
import jwtDecode from "jwt-decode";
import { ITokenPayload } from "~interfaces/index";

interface IUserSlice {
  id?: number,
  name: string,
  rank: number,
  isLogin: boolean,
  authToken?: string,
  newSecrets: number,
}

const initialState: IUserSlice = {
  isLogin: false,
  name: 'anonymous',
  rank: 0,
  newSecrets: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementRank: (state) => {
      state.rank++;
    },
    addNewSecret: (state) => {
      state.newSecrets++;
    },
    setUserName: (state, {payload}) => {
      state.name = payload;
    },
    setUserId: (state, {payload}) => {
      state.id = payload;
    },
    setIsLogin: (state, {payload}: {payload: boolean}) => {
      state.isLogin = payload;
    },
    setAuthToken: (state, {payload}: {payload: string}) => {
      state.authToken = payload;
    },
    setUserData: (state, {payload}: {payload: string}) => {
      const {id, name} = jwtDecode<ITokenPayload>(payload);
      state.authToken=payload;
      state.id=id;
      state.name=name;
      state.isLogin=true;
    }
  }
});

export const {setUserName, incrementRank, setIsLogin, setUserId, setAuthToken, setUserData, addNewSecret } = userSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    popUp: popUpSlice.reducer,
  }
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
