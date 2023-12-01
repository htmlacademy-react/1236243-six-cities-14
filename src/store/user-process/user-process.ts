import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';


const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = null;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
        state.user = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
        state.user = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NotAuth;
        state.user = null;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.user = null;
      });
  }
});
