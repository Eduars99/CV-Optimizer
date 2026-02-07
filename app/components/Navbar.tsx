import React from 'react'
import { Link } from 'react-router'

const navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-graident">CV Optimizer</p>
      
      </Link>
      <Link to="/upload" className='primary-button w-fit'>
        Subir Cv
      </Link>
    </nav>
  )
}

export default navbar
