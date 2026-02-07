import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../config";
import axios from "axios";

const AdminResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let [query] = useSearchParams();
  let token = query.get("token");
  console.log(token);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    try {
      const result = await axios({
        url: `${api}/web-users/reset-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result);

      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
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

export default AdminResetPassword;
