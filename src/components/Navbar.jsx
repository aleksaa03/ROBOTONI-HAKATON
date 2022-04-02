import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { auth, database } from "../Firebase";
import "../styles/Navbar.css";
import Coin from "../media/coin.png";
import "@fortawesome/fontawesome-free/css/all.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [listState, setListState] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignIn(true);
        database.ref(`users/${user.uid}`).on("value", (snap) => {
          setCoins(snap.val().score);
        });
      }
    });
  }, []);

  return (
    <div className="navbar">
      <div className="logo" onClick={() => {navigate("/")}}>
        <h1>ROBOTONI</h1>
      </div>
      <div className="nav-options-responsive">
        <i
          className="fa-solid fa-bars"
          onClick={() => {
            listState ? setListState(false) : setListState(true);
            document.body.style.overflow = "hidden";
          }}
        ></i>
        <div
          style={{
            display: listState ? "block" : "none",
            height: listState ? window.outerHeight : 0,
          }}
        >
          <i
            className="fa-solid fa-x"
            onClick={() => {
              setListState(false);
              document.body.style.overflow = "auto";
            }}
          ></i>
          <ul>
            {isSignIn ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/games"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Games
                </NavLink>
                <NavLink
                  to={`/account/${auth.currentUser.uid}`}
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Account
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "link"
                  }
                >
                  Sign In
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="nav-options">
        {isSignIn ? (
          <div className="coin">
            <img src={Coin} alt="" />
            <p>{coins}</p>
          </div>
        ) : (
          ""
        )}
        <ul>
          {isSignIn ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/games"
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                Games
              </NavLink>
              <NavLink
                to={`/account/${auth.currentUser.uid}`}
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                Account
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                Sign In
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
