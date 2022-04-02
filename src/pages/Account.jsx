import React, { useState, useLayoutEffect } from 'react'
import { auth, database } from '../Firebase'
import "../styles/Account.css"

import { useNavigate } from "react-router-dom"

import Ten from "../media/10.png";
import TwentyFive from "../media/25.png";
import Fifty from "../media/50.png";
import Hunderd from "../media/100.png";
import TwoHunderdFifty from "../media/250.png";
import FiveHunderd from "../media/500.png";
import BackArrow from "../media/back.png"

import MemoryGameIcon from "../media/memorygameicon.png"
import ReadingIcon from "../media/readingicon.png"
import CardGameIcon from "../media/cardgame.png"
import Avatar from "../media/avatar.png"

function Account() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [avatar, setAvatar] = useState(Avatar)
  const [location, setLocation] = useState("loading...")
  const [biography, setBiography] = useState("loading...")
  const [newBiography, setNewBiography] = useState("")
  const [score, setScore] = useState(0)

  const [changeBioModal, setChangeBioModal] = useState(false)
  const [user, setUser] = useState({})

  useLayoutEffect(() => {
     auth.onAuthStateChanged((user) => {
         if (user) {
             setUsername(user.displayName)
             setAvatar(user.photoURL)
             setUser(user)

             database.ref(`users/${user.uid}`).on('value', (snap) => {
                setLocation(snap.val().location ? snap.val().location : "");
                setBiography(snap.val().biography ? snap.val().biography : "");
                setScore(snap.val().score ?  parseInt(snap.val().score) : 0)
             })
         }
     })
  }, [])

  setTimeout(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUsername(user.displayName)
            setAvatar(user.photoURL)
            setUser(user)

            database.ref(`users/${user.uid}`).on('value', (snap) => {
                setLocation(snap.val().location ? snap.val().location : "");
                setBiography(snap.val().biography ? snap.val().biography : "");
               setScore(snap.val().score ? parseInt(snap.val().score) : 0)
            })
        }
    })
  }, 500);

  const SignOut = () => {
      auth.signOut().then(() => {
        navigate("/")
        localStorage.clear()
        sessionStorage.clear()
      })
  }

  const UpdateBiography = () => {
    database.ref(`users/${user.uid}`).update({
        biography: newBiography
    }).catch((error) => {
        console.log(error)
    })
    setChangeBioModal(false)
  }

  const VerifyAccount = () => {
      auth.currentUser.sendEmailVerification().then(() => {
          //
      })
  }

  const Profile = () => {
      return (
        <div className="profile-itm start-center column">
        <div className='img-wrp'>
            <img src={avatar} alt="" className='avatar' />
            <div className='change-avatar'>+</div>
        </div>
        <h1 className='username'>{username}</h1>
        <span className='sign-out' onClick={() => {SignOut()}}>Sign Out</span>
        { auth.currentUser ? auth.currentUser.emailVerified === true ? (<React.Fragment></React.Fragment>) : (
            <span className='verify-acc' onClick={() => {VerifyAccount()}}>Verify account</span>
        ) : ""}
    </div>
      )
  }

  const Header = () => {
      return (
        <header className='account-header full-width start-center'>
            <img src={BackArrow} alt="" className='back' onClick={() => {navigate("/")}} />
        </header>
      )
  }

  const GameItem = ({ title, img, route }) => {
      return (
          <div className='game center-align full-width' onClick={() => {navigate(route)}}>
              <img src={img} alt="" className='brain-img' />
              <span className='game-name'>{title}</span>
          </div>
      )
  }

  const MemoryGames = () => {
      return (
          <div className='full-width  start-start column'>
             <h1 className='time-spent'>{username} spends the most of their time on...</h1>
             <div className='full-width  start-start column'>
                 <GameItem title="Memory game" route="/memorygame" img={MemoryGameIcon} />
                 <GameItem title="Card game" route="/cardgame" img={CardGameIcon} />
                 <GameItem title="Reading" route="/reading" img={ReadingIcon} />
             </div>
          </div>
      )
  }

  const Badges = () => {
    
      return (
          <div className='full-width  start-start column badges'>
             <h1 className='badges-name'>Badges</h1>
             <div className='badges-wrp  start-start column full-width'>
                <div className="row-my full-width between-start">
                    <img src={Ten} alt="" className='badge-itm' style={{filter: `grayscale(${score < 11 ? 1 : 0})`}} />
                    <img src={TwentyFive} alt="" className='badge-itm' style={{filter: `grayscale(${score < 26 ? 1 : 0})`}} />
                    <img src={Fifty} alt="" className='badge-itm' style={{filter: `grayscale(${score < 51 ? 1 : 0})`}} />
                </div>
                <div className="row-my full-width between-start row-two">
                    <img src={Hunderd} alt="" className='badge-itm' style={{filter: `grayscale(${score < 101 ? 1 : 0})`}} />
                    <img src={TwoHunderdFifty} alt="" className='badge-itm' style={{filter: `grayscale(${score < 251 ? 1 : 0})`}} />
                    <img src={FiveHunderd} alt="" className='badge-itm' style={{filter: `grayscale(${score < 501 ? 1 : 0})`}} />
                </div>
             </div>
          </div>
      )
  }

  const Biography = () => {
      return (
        <div className='full-width  start-start column'>
             <h1 className='badges-name'>Biography</h1>
             <span className='bio-txt' onClick={() => {setChangeBioModal(true)}}>{biography}</span>
        </div>
      )
  }

  const Location = () => {
    return (
      <div className='full-width  start-start column badges'>
           <h1 className='badges-name'>Region</h1>
           <span className='city-location'>{location}</span>
      </div>
    )
}

  return (
    <React.Fragment>
        <section className='account-wrp just-center'>
            <div className="account-wrapper  start-start column">
                <Header />
                <div className='account full-width between-start'>
                     <Profile />
                     <div className="dashboard around-start">
                         <div className="leaderboard start-center column">
                            <MemoryGames />
                            <Badges />
                         </div>
                         <div className='bio start-center column'>
                            <Biography />
                            <Location />
                         </div>
                     </div>
                </div>
            </div> 
        </section>
       {
           changeBioModal && (
            <div className="overlay center-align">
            <div className="modal-itm  start-start column">
                <h1 className='badges-name mt-3'>Biography</h1>
                <textarea name="" id="" cols="30" rows="10" className='text-area' onChange={(e) => {setNewBiography(e.target.value)}}></textarea>
                <div className='full-width end-end bottom-buttons'>
                    <button className='save' onClick={() => { UpdateBiography() }}>SAVE</button>
                    <button className='cancel' onClick={() => {setChangeBioModal(false) && setNewBiography("")}}>CANCEL</button>
                </div>
            </div>
        </div>
           )
       }
    </React.Fragment>
  )
}

export default Account