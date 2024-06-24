import React from "react";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import AllRouters from "../Router/AllRouters";
import Headers from "./Header";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/icons";
const SideBar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        minHeight: "400px",
      }}
    >
      <Sidebar collapsed={collapsed} style={{ backgroundColor: "red" }}>
        <Menu>
          <MenuItem> Home</MenuItem>
          <SubMenu label="Product">
            <MenuItem> Mens</MenuItem>
            <MenuItem> Women</MenuItem>
            <SubMenu label="Product">
              <MenuItem> Mens</MenuItem>
              <MenuItem> Women</MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem>About</MenuItem>
          <MenuItem>Contact</MenuItem>
        </Menu>
      </Sidebar>
      <main className="container-fluid px-0" style={{ width: "100%" }}>
        <div className="row" style={{ backgroundColor: "green" }}>
          <div className="col-md-12 header">
            <a
              href="#default"
              className="logo"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Icon as={HamburgerIcon} />
            </a>

            <a href="/" className="active">
              Home
            </a>
            <a href="/Contact">Contact</a>
            <a href="/About">About</a>
          </div>
        </div>

        <div className="row">
          <div className="col-12" style={{ paddingLeft: "20px" }}>
            <AllRouters />
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
