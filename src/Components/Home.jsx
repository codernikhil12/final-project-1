import React from 'react'
import { useSelector } from 'react-redux'
import SignIn from '../Auth/SignIn'
import Createproduct from '../Pages/Createproduct'

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.auth)
  return (
    <>
      {!isLoggedIn ? (
        <SignIn />
      ) : (
        <>
          <Createproduct />
        </>
      )}
    </>
  )
}

export default Home