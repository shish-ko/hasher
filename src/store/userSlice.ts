import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAccountInfo, IToken, IUserSecrets, SERVER } from "~interfaces/index";
import { serverAPI } from "~utils/axios";

type IUserSlice = {
  secrets: IUserSecrets,
  isLogged: boolean,
  authToken?: string,
  newSecrets: number,
} & IAccountInfo

const initialState: IUserSlice = {
  id: 0,
  isLogged: false,
  name: '',
  secrets: {availableSecrets:[], futureSecrets: []},
  newSecrets: 0,
  userPic: null,
  emailSubs: false
};

const updateAccountInfo = createAsyncThunk(
  'user/updateAccountInfo',
  async (accountInfo: Partial<IAccountInfo>) => {
    const response = await serverAPI.put<IAccountInfo>(SERVER.ACCOUNT_INFO, accountInfo);
    return response.data;
  },
);

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
      state.id=0;
      state.name='';
      state.isLogged=false;
    }
  },
  extraReducers(builder) {
    builder.addCase(updateAccountInfo.fulfilled, (state, action) => {
      return {...state, ...action.payload};
    });
  },
});


export const { setUserData, setUserSecrets, removeUserData, setAuthToken, addNewSecret } = userSlice.actions;
export {userSlice, updateAccountInfo};

