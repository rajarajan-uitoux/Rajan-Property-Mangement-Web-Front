import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type AuthState = {
    user: any | null
    token: string | null
    registeredEmail: string | null
    verifyUser: any | null
}
const initialState = { 
  user: null, 
  token: null,
  registeredEmail: null,
  verifyUser: null
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState as AuthState,
    reducers: {
      setCredentials: (
        state,
        { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
      ) => {
        state.user = user;
        state.token = token;
      },
      setRegisteredEmail: (state, { payload: { registeredEmail }}: PayloadAction<{registeredEmail: any}>
        ) => {
          state.registeredEmail = registeredEmail;
      },
      setVerifyUser: (state, { payload: { verifyUser }}: PayloadAction<{verifyUser: any}>
        ) => {
          state.verifyUser = verifyUser;
      },
    },
})
  
  export const { 
    setCredentials,
    setVerifyUser,
    setRegisteredEmail
  } = authSlice.actions;
  
  export default authSlice.reducer;
  
  export const selectCurrentUser = (state: RootState) => state.userReducer;