import { configureStore, createSlice } from "@reduxjs/toolkit";

interface IUserSlice {
  name: string;
  rank: number;
}
const initialState: IUserSlice = {
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
    }
  }
});
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  }
});
