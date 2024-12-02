import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ABOUT_US_INFO } from "../appConstants";

const AboutUs = () => {
  const isFrontendOnly = useSelector((state) => state.isFrontendOnly);

  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((err) => console.error("Failed to copy text:", err));

    setTimeout(() => setCopied(false), 2000);
  };

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
      <strong>Email:</strong> {ABOUT_US_INFO.CREDENTIAL}
      <br />
      <strong>Password:</strong> {ABOUT_US_INFO.CREDENTIAL}
      <button
        onClick={() => handleCopy(ABOUT_US_INFO.CREDENTIAL)}
        disabled={copied}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default AboutUs;
