import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div className="mt-20">
            <NavBar/>
            <Outlet />
        </div>
    )
}

export default Layout
