import { createSlice } from "@reduxjs/toolkit";

interface IPopUp {
  message: string,
  type: 'success' | 'error' | 'info',
  isActive: boolean
}
const initialState: IPopUp = {
  message: 'Any test message',
  type: 'info',
  isActive: false
};

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setPopupMessage: (state, {payload}: {payload: Pick<IPopUp, "type"> & {message: string}} )=>{
      state.message=payload.message;
      state.type=payload.type;
      state.isActive = true;
    },
    hidePopUp: (state)=> {
      state.isActive=false;
    }
  }
});

export const {setPopupMessage, hidePopUp} = popUpSlice.actions;
