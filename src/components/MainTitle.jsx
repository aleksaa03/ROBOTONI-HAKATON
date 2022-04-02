import React from "react";
import "../styles/MainTitle.css";
import { useNavigate } from "react-router-dom";
import MachineLearningImage from "../media/machine-learning.svg";
import { auth } from "../Firebase";

const MainTitle = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="header">
        <h1>How we help?</h1>
        <p>
        Robotoni Hakaton is an application designed to make life easier and improve the functionality and resourcefulness of people with disabilities. The application enables the gradual improvement of abilities and general awareness. Every important text on this site has a button that will become an audio version of the text, which would make it easier for people with attention problems to use.
        </p>
        <button onClick={() => navigate(auth.currentUser ? `/account/${auth.currentUser.uid}` : "/signin")}>{auth.currentUser ? "Profile" : "Sign In"}</button>
      </div>
      <div className="image">
        <img src={MachineLearningImage} alt="" />
      </div>
    </div>
  );
};

export default MainTitle;
