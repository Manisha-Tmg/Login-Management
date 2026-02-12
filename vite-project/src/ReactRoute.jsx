import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRegister from "./admin/AdminRegister";
import AdminVerify from "./admin/AdminVerify";
import AdminLogin from "./admin/AdminLogin";
import AdminProfile from "./admin/AdminProfile";
import AdminLogOut from "./admin/AdminLogOut";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUpdateProfile from "./admin/AdminUpdateProfile";
import AdminChangePassword from "./admin/AdminChangePassword";
import AdminForgotPassword from "./admin/AdminForgotPassword";
import AdminResetPassword from "./admin/AdminResetPassword";
import ReadAllUser from "./admin/ReadAllUser";
import ReadSpecificUser from "./admin/ReadSpecificUser";
import UpdateUser from "./admin/UpdateUser";
import { GlabalVariableContex } from "./App";

const ReactRoute = () => {
  let global = useContext(GlabalVariableContex);
  return (
    <div>
      <Routes>
        <Route path="/logout" element={<AdminLogOut />}></Route>
        <Route path="/verify-email" element={<AdminVerify />}></Route>
        <Route path="admin">
          {global.token ? (
            <>
              <Route path="my-profile" element={<AdminProfile />}></Route>
              <Route
                path="update-profile"
                element={<AdminUpdateProfile />}
              ></Route>
              <Route path="users" element={<ReadAllUser />}></Route>
              <Route path="user/update/:id" element={<UpdateUser />}></Route>
              <Route path="user/:id" element={<ReadSpecificUser />}></Route>
              <Route
                path="change-password"
                element={<AdminChangePassword />}
              ></Route>
            </>
          ) : (
            <>
              <Route index element={<AdminDashboard />}></Route>
              <Route path="register" element={<AdminRegister />}></Route>
              <Route path="login" element={<AdminLogin />}></Route>
            </>
          )}

          <Route
            path="forgot-password"
            element={<AdminForgotPassword />}
          ></Route>
          <Route path="reset-password" element={<AdminResetPassword />}></Route>
        </Route>
        <Route path="*">404 page not found</Route>
      </Routes>
    </div>
  );
};

export default ReactRoute;
