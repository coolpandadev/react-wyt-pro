import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <ul className="flex">
            <li className="mr-5">
                <Link to="/">Home</Link>
            </li>
            <li className="ml-auto bg-red-400">
                <a href="https://wyt-rails.herokuapp.com/auth/yahoo_auth">Sign In with Yahoo</a>
            </li>
            </ul>
        </nav>
    )
}

export default NavBar
