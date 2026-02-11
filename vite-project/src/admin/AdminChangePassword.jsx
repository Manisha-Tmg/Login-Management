import React, { useState } from "react";
import { api } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const result = await axios({
        url: `${api}/web-users/update-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);

      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <div>
          <label htmlFor="password">Old Password :</label>
          <input
            type="password"
            name=""
            id="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="password">New Password :</label>
          <input
            type="password"
            name=""
            id="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="password">Confirm Password :</label>
          <input
            type="password"
            name=""
            id="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default AdminChangePassword;
