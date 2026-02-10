import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../config";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("female");
  const [user, setUser] = useState({});

  let token = localStorage.getItem("token");
  const params = useParams();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,
      dob: dob,
      gender: gender,
    };

    try {
      const result = await axios({
        url: `${api}/web-users/${params.id}`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/admin/users`);
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const getData = async () => {
    const result = await axios({
      url: `${api}/web-users/${params.id}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data = result.data.result;

    setFullName(data.fullName);
    setDob(data.dob);
    setGender(data.gender);
  };
  useEffect(() => {
    getData();
  }, []);
  let genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  let htmlDateFormat = (date = new Date()) => {
    date = new Date(date || new Date()).toLocaleDateString().split("/");

    let year = date[2];
    let month = date[0].length === 1 ? `0${date[0]}` : date[0];
    let day = date[1].length === 1 ? `0${date[1]}` : date[1];

    // convert -> yyyy-mm-dd format
    let dateFormat = `${year}-${month}-${day}`;

    return dateFormat;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <div>
          <label htmlFor="fullname">Full Name :</label>
          <input
            type="text"
            name=""
            id="fullName"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="dob">Dob :</label>
          <input
            type="date"
            name=""
            id="dob"
            value={htmlDateFormat(dob)}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Gender</label>
          {genderList.map((item, i) => {
            return (
              <div key={i}>
                <input
                  type="radio"
                  name=""
                  id={item.value}
                  value={item.value}
                  checked={gender === item.value}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <label htmlFor={item.label}>{item.label}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginLeft: "20px", marginTop: "10px" }}>
        <button>Update</button>
      </div>
    </form>
  );
};

export default UpdateUser;
