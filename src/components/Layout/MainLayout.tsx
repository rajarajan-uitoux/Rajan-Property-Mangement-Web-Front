import { Layout, Menu } from "antd";
import { useState, useMemo, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { SideBarIcons } from "../../utils/constants";
import Icon from "@ant-design/icons";
import Footer from "./Footer";
import Header from "./Header";
import "./MainLayout.css";
import { getPathArray } from "../../utils/urlPathConversion";

const { Sider, Content } = Layout;

const menus = [
  { label: "Dashboard", link: "/" },
  {
    label: "Customers management",
    link: "/customer",
    style: { marginLeft: "10px" },
  },
  { label: "Information", link: "/information" },
];

const MainLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState<any>(null);
  const { pathname } = useLocation();
  let currentPath = getPathArray(pathname)[0]?.name;

  currentPath =
    currentPath !== undefined ? `/${currentPath.toLowerCase()}` : "/";

  const MenuItems = menus?.map((menu, i) => {
    return {
      key: i,
      icon: <Icon component={SideBarIcons[i]} />,
      label: (
        <NavLink className="menulink" to={menu.link} style={menu.style}>
          {menu.label}
        </NavLink>
      ),
      link: menu.link,
    };
  });
  const footer = useMemo(() => <Footer />, []);

  const handleMenuChange = ({ key } : any) => {
    setSelectedMenu(key);
  };

  useEffect(() => {
    const currentMenuItem = MenuItems.find((el) => el.link == currentPath);

    setSelectedMenu(String(currentMenuItem?.key));
  }, [pathname]);
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

          <Menu onSelect={handleMenuChange}
            items={MenuItems}
            selectedKeys={[selectedMenu]}
          ></Menu>
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
