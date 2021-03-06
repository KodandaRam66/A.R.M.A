import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import axios from "axios";
import "./css/Form.css";

const FacultyRegister = () => {
  const [dept, setDept] = useState("CSE");
  const [isMessage, setMessage] = useState(false);
  const [contact, setContact] = useState({
    rollNo: "",
    name: "",
    email: "",
    cemail: "",
    pnum: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => setError(""), 7000);
    }
  });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  const isEnabled = contact.email === contact.cemail;
  const isPhone = contact.pnum.length === 10;
  const disable = isEnabled && isPhone;
  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_URL}/registerFaculty`, {
        registrationData: {
          faculty_name: contact.name,
          faculty_dept: dept,
          faculty_roll: contact.rollNo,
          faculty_email: contact.email,
          faculty_phone: contact.pnum,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.hasOwnProperty("err")) {
          setError(res.data.err);
        } else if (res.data.hasOwnProperty("message")) {
          setError(res.data.message);
          setMessage(true);
          setContact((prevState) => ({
            ...prevState,
            rollNo: "",
            name: "",
            email: "",
            cemail: "",
            pnum: "",
          }));
        }
      })
      .catch((err) => console.log(err));
  };
  //
  const deptList = ["CSE", "IT", "EEE", "ECE", "MECH", "CIVIL", "MBA"];
  return (
    <div className="all-items">
      <div className="rforms">
        <form>
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", height: "150px" }}
          />
          <h1 style={{ color: "white" }}>A.R.M.A Faculty Registration</h1>
          <br />
          <div className="justif">
            <h4>Roll No: </h4>
            <input
              type="text"
              onChange={handleChange}
              name="rollNo"
              className="inputboxess"
              value={contact.rollNo}
              placeholder="Roll Number"
            />
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>Name: </h4>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              className="inputboxess"
              value={contact.name}
              placeholder="Name"
            />
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>Department: </h4>
            <select
              className="selecti round"
              name="value"
              onChange={(e) => setDept(e.target.value)}
            >
              {deptList.map((depts) => (
                <option> {depts} </option>
              ))}
            </select>

            <span className="select-arrow"></span>
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>Email: </h4>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className="inputboxess"
              value={contact.email}
              placeholder="Email"
            />
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>Confirm Email: </h4>
            <input
              type="email"
              onChange={handleChange}
              name="cemail"
              className="inputboxess"
              value={contact.cemail}
              placeholder="Confirm Email"
            />
            <h5
              style={{
                display: !isEnabled ? "inline" : "none",
                color: "#ff1744",
              }}
              id="emailHelp"
              className="form-text"
            >
              Enter the same email as above
            </h5>
          </div>
          <br />
          <br />
          <div className="justif">
            <h4>PhoneNo: </h4>
            <input
              type="text"
              onChange={handleChange}
              className="inputboxess"
              name="pnum"
              value={contact.pnum}
              placeholder="Phone Number"
            />
          </div>
          <br />
          <br />
          <button
            type="submit"
            className="buttonpurple"
            onClick={handleRegister}
          >
            Register
          </button>

          <br />
          <h4 style={{ color: isMessage ? "green" : "#ff1744" }}>{error} </h4>
        </form>
      </div>
    </div>
  );
};

export default FacultyRegister;
