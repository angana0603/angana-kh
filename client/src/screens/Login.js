import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://angana-backend.onrender.com/api/loginuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    );
    const json = await response.json();
    if (!json.success) {
      alert("Enter valid values");
    }

    if (json.success) {
      localStorage.setItem("userEmail", values.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-bold text-primary"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold text-primary"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-primary">
            New user
          </Link>
        </form>
      </div>
    </div>
  );
}
