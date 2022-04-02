import React from 'react'
import "../styles/Games.css"
import Navbar from '../components/Navbar'
import BannerImage from "../media/banner-games.png"
import MemoryGameIcon from "../media/memorygameicon.png"
import ReadingIcon from "../media/readingicon.png"
import CardGameIcon from "../media/cardgame.png"
import { useNavigate } from "react-router-dom"

function Games() {

  const navigate = useNavigate()

  const Game = ({ image, name, route }) => {
      return (
          <div className='game-div' onClick={() => {navigate(route)}}>
               <img src={image} alt="" className='game-icon' />
               <h3 className='game-name-games'>{name}</h3>
          </div>
      )
  }

  return (
    <React.Fragment>
        <div className="games-wrp">
            <Navbar />
            <div className="banner-games">
               <div className='games-headline'>
                  <h1>Play games and</h1>
                  <h1>boost skills</h1>
               </div>
               <img src={BannerImage} alt="" className='banner-img' />
            </div>
            <div className='game-wrapper'>
                <h1 className='games-and-apps-headline'>Games and Applications</h1>
                <div className='games-wrapper'>
                    <Game name="Memory game" image={MemoryGameIcon} route="/memorygame" />
                    <Game name="Reading" image={ReadingIcon} route="/reading" />
                    <Game name="Card game" image={CardGameIcon} route="/cardgame" />
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Games