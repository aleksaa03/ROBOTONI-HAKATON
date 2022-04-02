import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import CardGame from "./pages/CardGame";
import CardGameSceneTwo from "./pages/CardGameSceneTwo";
import CardGameSceneThree from "./pages/CardGameSceneThree";
import MemoryGame from "./pages/MemoryGame";
import ReadingPage from "./pages/ReadingPage"
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signin" element={<Auth />} />
        <Route exact path="/account/:uid" element={<Account />} />
        <Route exact path="/cardgame" element={<CardGame />} />
        <Route exact path="/cardgamescenetwo" element={<CardGameSceneTwo />} />
        <Route exact path="/cardgamescenethree" element={<CardGameSceneThree />} />
        <Route exact path="/memorygame" element={<MemoryGame />} />
        <Route exact path="/reading" element={<ReadingPage />} />
        <Route exact path="/games" element={<Games />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routing;
