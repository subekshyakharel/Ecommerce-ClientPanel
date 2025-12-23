import React from 'react'
import AuthRoute from '../auth/AuthRoute'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from './SideBar'

const UserLayout = () => {
    const {user} = useSelector((state)=> state.userInfo)
  return (
    <AuthRoute>
        <Header/>

        <div className="d-flex">
        <div className="sidebar shadow text-dark p-3" style={{ minWidth: "200px" }}>
          <div>
            <div>Welcome Back</div>
            <h4>{user.fName}!</h4>
          </div>
          <hr />
          <Sidebar />
        </div>


        <div className="main">
            <Outlet/>
        </div>
        </div>

    </AuthRoute>
  )
}

export default UserLayout