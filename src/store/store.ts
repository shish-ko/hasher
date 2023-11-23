import { configureStore, createSlice } from "@reduxjs/toolkit";
import { popUpSlice } from "./popUpSlice";

interface IUserSlice {
  id?: number,
  name: string,
  rank: number,
  isLogin: boolean,
  authToken?: string
}

const initialState: IUserSlice = {
  isLogin: false,
  name: 'anonymous',
  rank: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementRank: (state) => {
      state.rank++;
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
    }
  }
});

export const {setUserName, incrementRank, setIsLogin, setUserId, setAuthToken} = userSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    popUp: popUpSlice.reducer,
  }
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
