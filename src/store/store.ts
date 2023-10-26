import { configureStore, createSlice } from "@reduxjs/toolkit";
import { popUpSlice } from "./popUpSlice";

interface IUserSlice {
  isLogin: boolean;
  name: string;
  rank: number;
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
    setIsLogin: (state, {payload}: {payload: boolean}) => {
      state.isLogin = payload;
    }
  }
});

export const {setUserName, incrementRank, setIsLogin} = userSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    popUp: popUpSlice.reducer,
  }
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
