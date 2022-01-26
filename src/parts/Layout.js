import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
        <div className='w-screen h-auto'>
            <NavBar />
            <div className='w-full h-auto'>
                <Outlet />
            </div>

        </div>
    )
}

export default Layout
