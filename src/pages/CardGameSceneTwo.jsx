import React, { useState, useEffect } from 'react'
import GameHeader from '../components/GameHeader'
import "../styles/CardGameTwo.css"

import CardImageUnrealived from "../media/card.png"
import LionCard from "../media/lion-card.png";
import TiggerCard from "../media/tigger-card.png"
import ElephantCard from "../media/elephant-card.png"
import { useNavigate } from "react-router-dom"
import { auth } from '../Firebase';

function CardGameSceneTwo() {

    const navigate = useNavigate()

    useEffect(() => {
        var timeLeft = 30;
        var elem = document.getElementById('timer');
        
        var timerId = setInterval(countdown, 1000);
        
        function countdown() {
    
          if (timeLeft === -1) {
            clearTimeout(timerId);
   
             navigate("/cardgamescenethree", {
                state: {
                     time: (30 - parseInt(document.getElementById('timer').innerText)),
                     score: (parseInt(document.getElementById('pairs').innerText) * 10),
                     pairs: document.getElementById('pairs').innerText,
                     fallback: "/cardgamescenetwo",
                 }
             })
          } else {
            elem.innerHTML = timeLeft ;
            timeLeft--;
            if (parseInt(document.getElementById('pairs').innerText) > 2) {
                clearTimeout(timerId);
                navigate("/cardgamescenethree", {
                    state: {
                      time:(30 - parseInt(document.getElementById('timer').innerText)),
                      score: (parseInt(document.getElementById('pairs').innerText) * 10),
                      pairs: document.getElementById('pairs').innerText,
                      fallback: "/cardgamescenetwo",
                    }
                })
      
             }
          }
        }
      }, [navigate]);
 
      useEffect(() => {
          auth.onAuthStateChanged((user) => {
              if (!user) {
                  navigate("/signin")
              }
          })
      }, [navigate]);

   let openedCards = []

   const CardsArray = [
       {
           image: LionCard,
           value: "lion",
           match: "lion2",
           id: 1
       },
       {
        image: TiggerCard,
        value: "tigger",
        match: "tigger2",
        id: 2
    },
    {
        image: ElephantCard,
        value: "elephant",
        match: "elephant2",
        id: 3
    },
    {
        image: LionCard,
        value: "lion2",
        match: "lion",
        id: 4
    },
    {
        image: TiggerCard,
        value: "tigger2",
        match: "tigger",
        id: 5
    },
    {
        image: ElephantCard,
        value: "elephant2",
        match: "elephant",
        id: 6
    },
   ];

   let matched = []

  const Card = ({ card }) => {
     const [show, setShow] = useState(false)

    const openCard = () => {
        document.getElementById(card.value).classList.add("flip-card")
        setShow(true)
        openedCards.push(card)
        for (let i = 0; i < openedCards.length; i++) {
            if (openedCards[i].match.trim().toLowerCase() === card.value.trim().toLowerCase()) {
                matched.push(openedCards[i].match)
                setTimeout(() => {
                    document.getElementById('pairs').innerText = matched.length;
                }, 200);
                setTimeout(() => {      
                    document.getElementById(openedCards[i].value).style.display = "none"
                   document.getElementById(card.value).style.display = "none"
                }, 500);
                   document.getElementById(openedCards[i].value).classList.add("remove-card")
                   document.getElementById(card.value).classList.add("remove-card")
            }
        }
    }
      
      return (
          <div style={{ backgroundImage: `url("${show ? card.image : CardImageUnrealived}")`}} className='card'  onClick={() => {openCard()}} id={card.value}></div>
      )
  }


  return (
    <div className='scene-two'>
      <GameHeader />
      <div className='game-points-bar'>
          <h1 className='card-name'>Card game</h1>
          <span className='points'>Pair: <span id='pairs'>0</span></span>
      </div>
      <div className="cards">
          <div className="card-row">
           {CardsArray.sort((a, b) => 0.5 - Math.random()).map((card, index) => (
              <Card card={card} key={index} />
           ))}
          </div>
    <div className="wrp-timer">
    <div className='timer-card' id='timer'></div>
    <div className='devider'></div>
    </div>
      </div>
    </div>
  )
}

export default CardGameSceneTwo