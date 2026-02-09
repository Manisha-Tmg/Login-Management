import axios from "axios";
import React, { useEffect, useState } from "react";
import { api } from "../config";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { resume } from "react-dom/server";

const AdminRegister = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const getData = async (e) => {
    const result = await axios({
      url: `${api}/web-users/my-profile`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(result.data.result);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleUpdate = () => {
    navigate("/admin/update-profile");
  };
  return (
    <form>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="fullname">Full Name : </label>
          <strong>{user.fullName}</strong>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="email">Email : </label>
          <strong>{user.email}</strong>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="dob">Dob :</label>
          <strong>{new Date(user.dob).toLocaleDateString()}</strong>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Gender : </label>
          <strong>{user.gender}</strong>
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
        <button style={{ marginLeft: "20px" }} onClick={handleUpdate}>
          Update
        </button>
        <button style={{ marginLeft: "20px" }}>Delete</button>
      </div>
    </form>
  );
};

export default AdminRegister;
