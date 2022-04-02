import React, { useState, useEffect } from 'react'
import GameHeader from '../components/GameHeader'
import Cards from "../media/cards.png"
import { useNavigate } from "react-router-dom"
import "../styles/CardGame.css"
import { auth } from '../Firebase'

function CardGame() {

  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            setIsAuth(true)
        }
    })
  }, [navigate]);

  return (
   <React.Fragment>
       <div className='card-screen-wrapper'>   
       <GameHeader />
          <div className='bg-cover-card'></div>
          <div className='game-data'>
            <div className='game-info'>
            <h1 className='card-name'>Card game</h1>
             <p className='card-game-desc'>
             Test your memory with this memory game. First select the difficulty level. The higher the number, the more cards are in the memo game. On the game board, there are always two identical images. Start the game by flipping a card. Then try to find another card that has the same image as the first. If you can't find a pair, the flipped cards will be flipped back with the face down. Try to remember these images as it becomes easier to find pairs the longer you play. When you find a pair they are removed from the board and when you find all the pairs in this memory, you have completed the level.
             </p>
             <button className='start-btn' onClick={() => {navigate(isAuth ? '/cardgamescenetwo' : "/signin")}}>Start</button>
            </div>
            <img src={Cards} alt="" className='card-imgs' />
          </div>
       </div>
   </React.Fragment>
  )
}

export default CardGame