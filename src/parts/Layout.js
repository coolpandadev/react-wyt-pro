import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div className="pt-20">
            <NavBar/>
            <Outlet />
        </div>
    )
}

export default Layout
