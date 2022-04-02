import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import "../styles/Footer.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Footer = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignIn(true);
      }
    });
  }, []);

  return (
    <div className="footer">
      <div className="nav-links">
        <h1>ROBOTONI</h1>
        {isSignIn ? (
          <>
            <h3 onClick={() => navigate("/")}>Home</h3>
            <h3 onClick={() => navigate("/games")}>Games</h3>
            <h3 onClick={() => navigate(`/account/${auth.currentUser.uid}`)}>
              Account
            </h3>
          </>
        ) : (
          <>
            <h3 onClick={() => navigate("/")}>Home</h3>
            <h3 onClick={() => navigate("/signin")}>Sign In</h3>
          </>
        )}
      </div>
      <div className="social-media">
        <h3>
          <i className="fa-brands fa-instagram"></i> Instagram
        </h3>
        <h3>
          <i className="fa-brands fa-facebook"></i> Facebook
        </h3>
        <h3>
          <i className="fa-brands fa-twitter"></i> Twitter
        </h3>
        <h3>
          <i className="fa-brands fa-pinterest"></i> Pinterest
        </h3>
      </div>
      <div className="newsletter">
        <h1>Recive out newsletter</h1>
        <p>Learn how you can help the people around you.</p>
        <div className="input">
          <input type="email" name="" id="" placeholder="Email..." />
          <button>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
