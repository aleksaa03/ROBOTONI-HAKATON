import React from 'react'
import "../styles/NotFound.css"
import { NavLink } from "react-router-dom"

function NotFound() {
  return (
     <div className='page-wrp'>
           <h1>404</h1>
           <span>Page Not Found</span>
           <NavLink to="/" className="go-back-home">Go back to Home</NavLink>
     </div>
  )
}

export default NotFound