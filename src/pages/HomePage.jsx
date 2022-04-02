import React from "react";
import Navbar from "../components/Navbar";
import MainTitle from "../components/MainTitle";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import Logos from "../media/logos.svg";
import VirtualAssistent from "../media/virtual-assistent.svg";
import GrowAndDevelop from "../media/grow-and-develop.svg";
import CommunicateWithEase from "../media/communicate-with-ease.svg";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <MainTitle />
      <div className="supported-platforms">
        <h1>A platform supported by many schools</h1>
        <img src={Logos} alt="" />
      </div>
      <div className="virtual-assistent">
        <div className="header">
          <h1>Learn to communicate with your virtual assistant</h1>
          <p>
            You’ll love how this symbol-based app helps users learn how to
            express themselves.BrandName puts the user’s development first, with
            innovative features based on clinical knowledge and user research.
          </p>
          <p>
            Completely customizable and designed for a range of fine-motor and
            visual skills, the app’s versatility makes it useful for non-verbal
            people with autism, Down syndrome, cerebral palsy, and a range of
            other diagnoses or speech impediments like apraxia and dysarthria.
          </p>
        </div>
        <div className="image">
          <img src={VirtualAssistent} alt="" />
        </div>
      </div>
      <div className="brand-names">
        <h1>Out BrandName app in action</h1>
        <div className="names">
          <div className="grow-and-develop">
            <img src={GrowAndDevelop} alt="" />
            <h3>Grow and develop</h3>
            <p>
              Studies show that just 200-400 words make up 80% of what we say.
              Known as core words, they act as the basis of Proloquo2Go. Users
              can develop from single words to full grammatical sentences in the
              same comprehensive app.
            </p>
            <ul>
              <li>
                Research-based core word Crescendo™ vocabulary which works with
                best practices like modeling to grow language skills.
              </li>
              <li>
                No limit on language development, and fringe word vocabulary of
                10,000+ words and customizable vocabulary levels.
              </li>
              <li>
                Helps a user gradually learn vocabulary by revealing words step
                by step with the Progressive Language feature.
              </li>
            </ul>
          </div>
          <div className="communicate-with-ease">
            <img src={CommunicateWithEase} alt="" />
            <h3>Communicate with ease</h3>
            <p>
              Smart features and a handy layout make navigating and using the
              app simple.
            </p>
            <ul>
              <li>
                Core words stay in the same place throughout the vocabulary to
                aid motor planning.
              </li>
              <li>
                Customizable folder organization. You can also create your own
                folders easily, based on thematic templates.
              </li>
              <li>
                Designed for a range of fine-motor and visual skills with
                options like 23 pre-programmed grid sizes and accessibility
                settings which support scanning and Apple’s VoiceOver.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
