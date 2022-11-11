import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { checkTokenValidity } from "./helper/checktoken.helper";
import Routes from "./routes/Routes";
import { 
  useCheckTokenMutation, 
  useFetchRefreshTokenMutation 
} from "./services/Login";

const App = () => {  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkToken] = useCheckTokenMutation();
  const [fetchRefreshToken] = useFetchRefreshTokenMutation();
  
  useEffect(() => {
    checkTokenValidity(
      navigate, 
      pathname, 
      dispatch,
      checkToken,
      fetchRefreshToken
      );
  }, []);
  return  <Routes />;
}

export default App;