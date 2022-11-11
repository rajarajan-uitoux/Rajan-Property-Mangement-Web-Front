import { setCredentials } from "../app/slices/loginSlice";
import tryCatch from "./tryCatch.helper";

export const checkTokenValidity = async (
  navigate:any,
  pathname:any,
  dispatch:any,
  checkToken:any,
  fetchRefreshToken:any,
) => {

  const token:any = JSON.parse(localStorage.getItem("token") || '{}');

  if (token && Object.keys(token).length !== 0) {
    
    if (new Date() < token?.access?.expiresIn) {
      const [tokenResponse, tokenError] = await tryCatch(
        checkToken(token?.access?.token)
      );
      if (!tokenError) {
        dispatch(setCredentials({
          token:token?.access?.token,
          user: {
            firstName: tokenResponse?.data?.firstName,
            roleName: tokenResponse?.data?.roleName,
            image: tokenResponse?.data?.image,
            phoneNumber: tokenResponse?.data?.phoneNumber,
            emailID: tokenResponse?.data?.emailID
          }
        }));
        
        navigate(pathname);
        
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {      
      const [refreshTokenRes, refreshTokenError] = await tryCatch(
        fetchRefreshToken(token?.refresh?.token)
      );

      if (!refreshTokenError) {
        console.log(refreshTokenRes);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }
};