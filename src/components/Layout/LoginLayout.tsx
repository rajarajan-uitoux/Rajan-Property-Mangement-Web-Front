import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { LoginImage } from "../../utils/constants";

const { Content } = Layout;

const LoginLayout = () => {
  const token = localStorage.getItem("token");
  
  return (    
      <div className={"login"}>
          
        <div
          className={"loginimage"}
          style={{
            backgroundImage: `url(${LoginImage})`,
            backgroundRepeat: "no-repeat",

            backgroundSize: "cover",
          }}
        ></div>
        
        <div className="loginmain">
        <div className={"logo"}>Logo</div>
          {!token ? <Outlet /> : <Navigate to="/" />}
        </div>
      </div>    
  );
}

export default LoginLayout;
