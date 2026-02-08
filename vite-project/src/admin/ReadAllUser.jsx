import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config";
import axios from "axios";
import { GlabalVariableContex } from "../App";

const ReadAllUser = () => {
  const [user, setUser] = useState([]);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getData = async (e) => {
    const result = await axios({
      url: `${api}/web-users`,
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

  const handleView = (id) => {
    return () => {
      navigate(`/admin/user/${id}`);
    };
  };
  const handleEdit = (id) => {
    return () => {
      navigate(`/admin/user/update/${id}`);
    };
  };

  const handleDelete = (id) => {
    return async () => {
      const result = await axios({
        url: `${api}/web-users/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getData();
    };
  };
  return (
    <div>
      {user.map((item, i) => {
        return (
          <div key={i}>
            <p>Name is {item.fullName}</p>
            <p>Email is {item.email}</p>
            <p>Gender is {item.gender}</p>
            <p>Dob is {new Date(item.dob).toLocaleDateString()}</p>
            <div>
              <button onClick={handleView(item.id)}>View </button>
              <button
                style={{ marginLeft: "20px" }}
                onClick={handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                style={{ marginLeft: "20px" }}
                onClick={handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReadAllUser;
