import React, { useEffect } from 'react'
import "../styles/CardGameThree.css"
import GameHeader from '../components/GameHeader'
import { useLocation, useNavigate } from "react-router-dom"
import { auth, database } from '../Firebase'

function CardGameSceneThree() {

 const navigate = useNavigate()

 const pairs = useLocation().state.pairs
 const time = useLocation().state.time
 const score = useLocation().state.score
 const fallback = useLocation().state.fallback

 useEffect(() => {
     auth.onAuthStateChanged((user) => {
        let prevScore = 0;
        database.ref(`users/${user.uid}`).on('value', (snap) => {
            prevScore = snap.val().score
        })

       setTimeout(() => {
            database.ref(`users/${user.uid}`).update({
              score: parseInt(score) + parseInt(prevScore)
            })
       }, 500);
     })
 }, [score]);

  return (
    <React.Fragment>
        <div className='end-game'>
           <GameHeader />
           <div className="popup-result">
               <div className='text-aligner'>
                   <h1 className='game-title-final'>Card game</h1>
               </div>
               <div className='text-aligner-left'>
                   <h1 className='score-title'>Score: </h1>
               </div>
               <div className='props'>
                   <h1 className='props-items'>Pairs: {pairs}</h1>
                   <h1 className='props-items'>Time: {time} seconds</h1>
                   <h1 className='props-items'>Score: {score}</h1>
               </div>
               <div className='end-footer'>
                    <button className='save' onClick={() => {navigate(fallback)}}>NEW GAME</button>
                    <button className='cancel' onClick={() => {navigate("/account/" + auth.currentUser.uid)}}>CANCEL</button>
                </div>
           </div>
        </div>
    </React.Fragment>
  )
}

export default CardGameSceneThree