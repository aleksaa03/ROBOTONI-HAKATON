import React, { useState, useEffect } from 'react'
import "../styles/AuthMain.css"
import CoverImage from "../media/form-cover.png"
import GoogleLogo from "../media/Google.png"
import FacebookLogo from "../media/Facebook.png"
import firebase from "firebase"

import { auth, database } from '../Firebase'

import { useNavigate } from "react-router-dom"

function Auth() {

  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(false)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [animateError, setAnimateError] = useState(false)

  useEffect(() => {
   auth.onAuthStateChanged((user) => {
       if (user) {
       navigate(`/account/${user.uid}`)

       } 
   })
  }, [navigate])

  const triggerAuthState = () => {
      if (isSignUp) {
          setIsSignUp(false)
      } else {
          setIsSignUp(true)
      }
  }

  const SendDataToLocalStorage = (user) => {
    const userData = {
        displayName: username,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
    };

    localStorage.setItem(user.uid, JSON.stringify(userData))
  }

  const SignUpWithGoogleAuthProvider = (type) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    if (type.trim().toLowerCase() === "facebook") {
        provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('hakaton');
    } else if (type.trim().toLowerCase() === "google"){
        provider = new firebase.auth.GoogleAuthProvider();
    }

    auth.signInWithPopup(provider)
      .then((response) => {

        const { user } = response;

        fetch(`https://api.db-ip.com/v2/free/self`)
        .then((response) => response.json())
        .then((data) => {
            const { ipAddress } = data;
            GetUsersLocation(ipAddress, user.uid)
        })
        .catch((error) => {
            console.log(error)
            GetUsersLocation(null, user.uid)
        })

        SendDataToLocalStorage(user)

       navigate(`/account/${user.uid}`)

      }).catch((error) => {
        console.log(error.message)
      });
  }

  const GetUsersLocation = async (IP_ADDRESS, uid) => {
      const GEO_API_KEY = "2605995ff2f1407da502344efd344168";

      await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_API_KEY}&ip=${IP_ADDRESS}`)
      .then((response) => response.json())
      .then((response) => {
          let formattedLocation = `${response.city}, ${response.country_name}`;
          
          database.ref(`users/${uid}`).set({
              location: formattedLocation === undefined || formattedLocation === "undefined"  || formattedLocation === "" ? "No address" : formattedLocation,
              biography: "Tap to edit biography",
              score: 0
          }).catch((alert) => {
            console.log(alert);
        })
      })
      .catch((error) => {
        console.log(error)

        database.ref(`users/${uid}`).set({
            location: "No address",
            biography: "Tap to edit biography",
            score: 0
        }).catch((alert) => {
            console.log(alert);
        })
        
         return;
      })
  }

  const SignUpWithCustomCredentials = () => {
      auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {

        const { user } = response;

        SendDataToLocalStorage(user)
        
      setTimeout(() => {
        user.updateProfile({
            displayName: username,
            photoURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }).then(() => {
            fetch(`https://api.db-ip.com/v2/free/self`)
            .then((response) => response.json())
            .then((data) => {
                const { ipAddress } = data;
                GetUsersLocation(ipAddress, user.uid)
            })
            .catch((error) => {
                console.log(error)
                GetUsersLocation(null, user.uid)
            })
    
           navigate(`/account/${user.uid}`)
        }).catch((error) => {
            console.log(error);
        })
      }, 100);

      })
      .catch((error) => {
        setErrorMessage(error.message)
        setAnimateError(true)
        
        setTimeout(() => {
            setAnimateError(false)
        }, 3500);

        setTimeout(() => {
            setErrorMessage("")
        }, 3800);
      })
  }

  const SignInWithCustomCredentials = () => {
      auth.signInWithEmailAndPassword(email, password)
      .then((response) => {

          const { user } = response.user;

          SendDataToLocalStorage(user)

         navigate(`/account/${user.uid}`)
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setAnimateError(true)
        
        setTimeout(() => {
            setAnimateError(false)
        }, 3500);
   
        setTimeout(() => {
            setErrorMessage("")
        }, 3800);
    })
  }

  const handleClickAction = (event) => {
     event.preventDefault();
      if (isSignUp) {
        SignUpWithCustomCredentials()
      } else {
        SignInWithCustomCredentials()
      }
  }

  const GoogleAuthProvider = () => {
        SignUpWithGoogleAuthProvider("google")
  }

  const FacebookAuthProvider = () => {
        SignUpWithGoogleAuthProvider("facebook")
 }

 const GetPasswordRecoveryEmail = () => {
     auth.sendPasswordResetEmail(email)
     .then(() => {
        setErrorMessage("Email sent to: " + email)
        setAnimateError(true)
        
        setTimeout(() => {
            setAnimateError(false)
        }, 3500);
      
        setTimeout(() => {
            setErrorMessage("")
        }, 3800);
     })
     .catch((error) => {
        setErrorMessage(error.message)
        setAnimateError(true)
        
        setTimeout(() => {
            setAnimateError(false)
        }, 3500);

        setTimeout(() => {
            setErrorMessage("")
        }, 3800);
     })
 }

  return (
    <React.Fragment>
        <main className='auth-main center-align'>
           <form className='form between-start '>
               <div className='form-cover center-align'>
                   <img src={CoverImage} alt="" className='bg-img' />
               </div>
               <section className='form-inputs start-center'>
                    <div className="fields between-start column">
                        <h1 className='auth-type'>{isSignUp === false? "Log In" : "Sign Up"}</h1>
                        <div className='input-fields between-start column full-width'>
                        {
                                isSignUp && (
                                    <div className="field-wrp full-width start-align column">
                                        <input maxlength="15" onChange={(e) => {setUsername(e.target.value)}} type="text" name='username' placeholder='Username' className='field full-width' autoComplete='off' />
                                        <div className="field-bottom full-width"></div>
                                    </div>
                                )
                            }
                            <div className="field-wrp full-width start-align column">
                               <input onChange={(e) => {setEmail(e.target.value)}} type="email" name='email' placeholder='Email' className='field full-width'  autoComplete='off' />
                               <div className="field-bottom full-width"></div>
                            </div>
                            <div className="field-wrp full-width start-align column">
                                    <input onChange={(e) => {setPassword(e.target.value)}} type="password" name='password' placeholder='Password' className='field full-width' autoComplete='off' />
                                    <div className="field-bottom full-width"></div>
                            </div> 
                            <div className='full-width end-align  txt-labels'>
                                <span>Forgot password? <span className='create-color' onClick={() => {GetPasswordRecoveryEmail()}}>Enter email and reset it</span></span>
                            </div>     
                        </div>
                        <div className='buttons full-width between-center'>
                             <div className='auth-button center-align' onClick={() => {GoogleAuthProvider()}}><img src={GoogleLogo} alt="" className='provider-logo' />Google</div>
                             <div className='auth-button center-align' onClick={() => {FacebookAuthProvider()}}><img src={FacebookLogo} alt="" className='provider-logo' />Facebook</div>
                        </div>
                        <div className='full-width center-align txt-labels mt-bg'>
        
                              <span>{isSignUp ? "Already have an account?" : "Don't have an account?"}<span className='create-color' onClick={() => {triggerAuthState()}}>{isSignUp ? "Log In" : "Create one"}</span></span>
                        </div>
                        <button className='action-btn' 
                         onClick={(event) => {handleClickAction(event)}}
                        >{isSignUp === false? "Sign In" : "Sign Up"}</button>
                        <div className='full-width center-align marg-left'>
                            <span className={animateError === true ? 'error-message' : 'remove-message'}>{errorMessage}</span>
                        </div>
                    </div>
               </section>
           </form>
        </main>
    </React.Fragment>
  )
}

export default Auth