import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlabalVariableContex } from "../App";

const AdminLogOut = () => {
  const navigate = useNavigate();
  let global = useContext(GlabalVariableContex);

  useEffect(() => {
    localStorage.removeItem("token");
    global.setToken(null);
    navigate("/admin/login");
  }, []);
  return <div>AdminLogOut</div>;
};

export default AdminLogOut;
