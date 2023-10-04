import { configureStore, createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
  isLogin: boolean;
  name: string;
  rank: number;
}
const initialState: IUserSlice = {
  isLogin: false,
  name: 'anonymus',
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
    toggleIsLogin: (state) => {
      state.isLogin = !state.isLogin;
    }
  }
});

export const {setUserName, incrementRank, toggleIsLogin} = userSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  }
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
