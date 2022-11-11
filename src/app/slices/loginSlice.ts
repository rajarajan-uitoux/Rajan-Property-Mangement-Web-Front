import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

type AuthState = {
    user: any | null
    token: string | null
} 

const authSlice = createSlice({
    name: 'authSlice',
    initialState: { user: null, token: null } as AuthState,
    reducers: {
      setCredentials: (
        state,
        { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
      ) => {
        state.user = user
        state.token = token
      },
    },
})
  
  export const { setCredentials } = authSlice.actions;
  
  export default authSlice.reducer;
  
  export const selectCurrentUser = (state: RootState) => state.userReducer;