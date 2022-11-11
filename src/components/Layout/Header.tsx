import { Divider, Layout, message, Popover } from "antd";
import { getPathArray } from "../../utils/urlPathConversion";
import { useLocation, useNavigate } from "react-router-dom";
import LiveDateTime from "../General/LiveDateTime";
import { profileStockImage } from "../../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
const { Header: LayoutHeader } = Layout;

const Header = () => {
  const { user } = useSelector((state:RootState) => state.userReducer);
  const { pathname } = useLocation();
  const pathTitle = getPathArray(pathname)[0]?.name;
  const navigate = useNavigate();
  
  const headerNavComponents:any = {
    Dashboard: "Dashboard",
    Customer: "Customer Management",
    Information: "Information",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success({
      content: "Logged Out Successfully!",
    });
    navigate("/login");
  };

  return (
    <LayoutHeader className={"header_main"}>
      <div className={"header_container"}>
        <div className="header_left_content">
          <div className="header_info_card">{headerNavComponents[pathTitle || "Dashboard"]}</div>
        </div>
        <div className="header_right_content">
          <LiveDateTime />
          <Divider
            type="vertical"
            style={{ height: "40px", margin: "0px 16px" }}
          />

          <Popover
            className="profile_popover"
            placement="bottom"
            content={
              <div
                style={{ width: "100%" }}
                className="logout"
                onClick={handleLogout}
              >
                Logout
              </div>
            }
            trigger={"click"}
            style={{ width: "400px" }}
          >
            <div className="header_profile">
              <img className="header_profile_image" src={profileStockImage} />

              <div className="header_profile_text">
                <div className="header_profile_text_name">
                  {user?.firstName}
                </div>
                <div className="header_profile_text_designation">
                  {user?.roleName}
                </div>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </LayoutHeader>
  );
}

export default Header;