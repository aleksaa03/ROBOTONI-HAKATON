import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReadingImage from "../media/reading.svg";
import "../styles/ReadingPage.css";

const ReadingPage = () => {
  const [speakText, setSpeakText] = useState("");

  const speech = new SpeechSynthesisUtterance();
  const speechOptions = window.speechSynthesis;

  const Speak = () => {
    speech.text = speakText;
    speech.voice = speechOptions.getVoices()[0];
    speechOptions.speak(speech);
  };

  return (
    <>
      <Navbar />
      <div className="reading">
        <div className="app">
          <h1>Reading application</h1>
          <p>
            Enter the text here, and our robot will read the entered text to
            you.
          </p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Enter text..."
            onChange={(e) => setSpeakText(e.target.value)}
          ></textarea>
          <button onClick={Speak}>Read</button>
        </div>
        <div className="image">
          <img src={ReadingImage} alt="" loading="lazy" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReadingPage;
