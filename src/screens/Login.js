import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URLS, LOGIN_CREDENTIALS } from "../appConstants";
import { API_DATA } from "../apiConstants";
import { setIsLoggedIn } from "../features/foodExpressSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const isFrontendOnly = useSelector((state) => state.isFrontendOnly);

  const [userCredentials, setUserCredentials] = useState({
    email: isFrontendOnly ? LOGIN_CREDENTIALS.DUMMY_USERNAME : "",
    password: isFrontendOnly ? LOGIN_CREDENTIALS.DUMMY_PASSWORD : "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const disableLogin =
    !userCredentials.email.trim() || !userCredentials.password.trim();

  const dispatch = useDispatch();

  //using this method only when 'isFrontendOnly' is true for locally validating the credentials
  const isValidCredentials = (userData) => {
    console.log("userData", userData);

    return (
      userData?.email &&
      userData?.password &&
      userData.email === LOGIN_CREDENTIALS.DUMMY_USERNAME &&
      userData.password === LOGIN_CREDENTIALS.DUMMY_PASSWORD
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let userLoginResponse;

    if (isFrontendOnly) {
      //Code for using dummy data for login API
      userLoginResponse = API_DATA.USER_LOGIN;
    } else {
      // Code for calling actual API for login
      const response = await fetch(API_URLS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userCredentials.email,
          password: userCredentials.password,
        }),
      });
      userLoginResponse = await response.json();
    }

    //if 'isFrontendOnly' is true then validate the user entered credentials locally, otherwise use response from API
    if (
      isFrontendOnly
        ? isValidCredentials(userLoginResponse.userData)
        : userLoginResponse.success
    ) {
      localStorage.setItem("authToken", userLoginResponse.authToken);
      localStorage.setItem("userEmail", userLoginResponse.userData.email);
      localStorage.setItem("username", userLoginResponse.userData.username);
      dispatch(setIsLoggedIn({ type: "LOGIN" }));
      navigate("/");
    } else {
      alert("Please enter valid credentials");
    }
  };

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <form>
        <h1 className="heading">Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={userCredentials.email}
            onChange={(e) => handleChange(e)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <div className="d-flex align-items-center">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              value={userCredentials.password}
              onChange={(e) => handleChange(e)}
              placeholder="Password"
            />

            <span style={{ marginLeft: "-25px" }}>
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={togglePasswordVisibility}
              />
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-success"
          onClick={handleLogin}
          disabled={disableLogin}
        >
          Login
        </button>

        <Link to="/signUp" className="m-3 btn btn-primary">
          New user?
        </Link>
      </form>
    </div>
  );
};

export default Login;
