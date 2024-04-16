import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import HomeContent from '../Components/HomeContent/HomeContent'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const navigate = useNavigate()
    const state = useSelector(state => state.auth)

    useEffect(() => {
      if(state.user && state.user.is_authenticated) {}
      else navigate('/login')  
    }, [])

  return (
    <>
    <Navbar />
    <HomeContent wishee='users'/>
    </>

  )
}

export default Home