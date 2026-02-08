import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../config";
import axios from "axios";

const ReadSpecificUser = () => {
  const [user, setUser] = useState({});

  let token = localStorage.getItem("token");
  const navigate = useNavigate();
  const params = useParams();

  const getData = async (e) => {
    const result = await axios({
      url: `${api}/web-users/${params.id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);
    setUser(result.data.result);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p>Name is {user.fullName}</p>
      <p>Email is {user.email}</p>
      <p>Gender is {user.gender}</p>
      <p>Dob is {new Date(user.dob).toLocaleDateString()}</p>
    </div>
  );
};

export default ReadSpecificUser;
