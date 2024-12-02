import React from "react";
import { useSelector } from "react-redux";
import {
  ABOUT_US_INFO,
} from "../appConstants";

const AboutUs = () => {
  const isFrontendOnly = useSelector((state) => state.isFrontendOnly);
  return (
    <div className="about-us-container">
      <h3>Description:</h3>
      {isFrontendOnly
        ? ABOUT_US_INFO.ABOUT_US_TEXT_FRONTEND_ONLY
        : ABOUT_US_INFO.ABOUT_US_TEXT}
      <h3 className="mt-4">How to use?</h3>
      {!isFrontendOnly ? (
        <>
          {ABOUT_US_INFO.LOGIN_INFO_1}
          <br />
          OR
          <br />
        </>
      ) : null}
      {ABOUT_US_INFO.LOGIN_INFO_2}
      <br />
      <br />
      Email: {ABOUT_US_INFO.CREDENTIAL}
      <br />
      Password: {ABOUT_US_INFO.CREDENTIAL}
    </div>
  );
};

export default AboutUs;
