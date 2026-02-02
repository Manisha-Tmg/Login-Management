import axios from "axios";
import React, { useState } from "react";
import { api } from "../config";
import { toast } from "react-toastify";

const AdminRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("female");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,
      email: email,
      password: password,
      dob: dob,
      gender: gender,
    };
    data = {
      ...data,
      role: "admin",
    };
    try {
      const result = await axios({
        url: `${api}/web-users/register`,
        method: "post",
        data: data,
      });
      toast.success(result.data.message);
      setFullName("");
      setEmail("");
      setPassword("");
      setDob("");
      setGender("female");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  let genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
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
        <div style={{ marginTop: "10px" }}>
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
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="dob">Dob :</label>
          <input
            type="date"
            name=""
            id="dob"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
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
        <button>Register</button>
      </div>
    </form>
  );
};

export default AdminRegister;
