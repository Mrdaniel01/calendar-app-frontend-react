import React from 'react';
import {useDispatch, useSelector}from 'react-redux';
import {startLogout} from '../../actions/auth';
export const Navbar = () => {

  const {name} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const nameToUppercase = name.toUpperCase() 
  
  const handleLogout = () => {
    dispatch( startLogout())
    
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>
        {nameToUppercase}
      </span>

      <button
        className='btn btn-outline-danger'
        onClick={handleLogout}    
      >
        <i className='fas fa-sign-out-alt'></i>
        <span> Salir </span>
      </button>
    </div>
  )
}