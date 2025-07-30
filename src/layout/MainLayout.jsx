import React from 'react'
import Header from '../components/Header'
// import Navigation from '../components/Navigation'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Header/>
      {/* <Navigation/> */}
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default MainLayout;