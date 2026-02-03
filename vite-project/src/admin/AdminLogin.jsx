import axios from "axios";
import { use, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../config";
import { useNavigate } from "react-router-dom";
import { GlabalVariableContex } from "../App";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let global = use(GlabalVariableContex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    try {
      const result = await axios({
        url: `${api}/web-users/login`,
        method: "post",
        data: data,
      });
      toast.success(result.data.message);
      localStorage.setItem("token", result.data.token);
      global.setToken(result.data.token);
      navigate("/admin");
      console.log(token);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const handlePassword = () => {
    navigate("/admin/forgot-password");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name=""
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name=""
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginTop: "10px", cursor: "pointer" }}>
        <button style={{ cursor: "pointer" }}>Log In</button>
        <div
          style={{ marginTop: "10px", cursor: "pointer" }}
          onClick={handlePassword}
        >
          Forgot Password
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
