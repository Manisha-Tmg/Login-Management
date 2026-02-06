import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
    };

    try {
      const result = await axios({
        url: `${api}/web-users/forgot-password`,
        method: "post",
        data: data,
      });
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
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
      </div>
      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
        <button>Forgot Password</button>
      </div>
    </form>
  );
};

export default AdminForgotPassword;
