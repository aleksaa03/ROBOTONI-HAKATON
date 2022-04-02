import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CardGame.css";
import BackImage from "../media/back.png";

const GameHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="header-card">
      <img
        src={BackImage}
        alt=""
        className="back-img-arrow"
        onClick={() => {
          navigate("/");
        }}
      />
      <h1 className="brand-name">ROBOTONI</h1>
    </header>
  );
};

export default GameHeader;
