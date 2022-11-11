import { Layout, Menu } from "antd";
import { useState, useMemo } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SideBarIcons } from "../../utils/constants";
import Icon from "@ant-design/icons";
import Footer from "./Footer";
import Header from "./Header";
import "./MainLayout.css";

const { Sider, Content } = Layout;

const menus = [
  { label: "Dashboard", link: "/" },
  {
    label: "Customers management",
    link: "/customer",
    // style: { marginLeft: "10px" },
  },
  { label: "Information", link: "/information" },
];

const MainLayout = () => {
  const [active, setActive] = useState("");

  const MenuItems = menus?.map((menu, i) => {
    return {
      key: i,
      icon: (
        <Icon
          component={SideBarIcons[i]}
        />
      ),
      label: (
        <NavLink
          className="menulink"
          to={menu.link}
          // style={menu.style}
          onClick={() => setActive(menu.label)}
        >
          {menu.label}
        </NavLink>
      ),
    };
  });
  const footer = useMemo(() => <Footer />, []);
  return (
    <Layout className={"main_layout"}>
      <Sider
        className={"sider_main sider_main_layout"}
        theme="light"
        width={"240px"}
        style={{ borderRight: "1px solid #EAEAEA" }}
      >
        <div className="main_layout_sider_menu_container">
          <div className="sider_logo_container">
            <div className="sider_logo_text">
              Property <br />
              Management
            </div>
          </div>

          <Menu items={MenuItems}></Menu>
        </div>
      </Sider>
      <Layout>
        <Header />
        <Content className="content_main">
          <Outlet />
        </Content>
        {footer}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
