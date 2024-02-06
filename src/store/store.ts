import { configureStore } from "@reduxjs/toolkit";
import { popUpSlice } from "./popUpSlice";
import { userSlice } from "./userSlice";
import { listenerMiddleware } from "./middlewares";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    popUp: popUpSlice.reducer,
  },
  // middleware(getDefaultMiddleware) {
  //   return getDefaultMiddleware().concat(listenerMiddleware.middleware);
  // },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
