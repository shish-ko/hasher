import { configureStore } from "@reduxjs/toolkit";
import { popUpSlice } from "./popUpSlice";
import { userSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    popUp: popUpSlice.reducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
