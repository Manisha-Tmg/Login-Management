import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlabalVariableContex } from "./App";

const ReactLink = () => {
  let global = useContext(GlabalVariableContex);
  console.log(global.token);

  return (
    <div>
      {global.token ? (
        <>
          <NavLink
            to={"/admin/my-profile"}
            style={{ marginRight: "20px", marginBottom: "30px" }}
          >
            My Profile
          </NavLink>
          <NavLink
            to={"/admin/users"}
            style={{ marginRight: "20px", marginBottom: "30px" }}
          >
            Users
          </NavLink>
          <NavLink
            to={"/admin/change-password"}
            style={{ marginRight: "20px", marginBottom: "30px" }}
          >
            Change Password
          </NavLink>
          <NavLink to={"/logout"}>Log Out</NavLink>
        </>
      ) : (
        <>
          <NavLink
            to={"/admin/register"}
            style={{ marginRight: "20px", marginBottom: "30px" }}
          >
            Admin register
          </NavLink>
          <NavLink
            to={"/admin/login"}
            style={{ marginRight: "20px", marginBottom: "30px" }}
          >
            Admin login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default ReactLink;
