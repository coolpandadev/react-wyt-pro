import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <ul class="flex">
            <li class="mr-5">
                <Link to="/">Home</Link>
            </li>
            <li class="ml-auto bg-red-400">
                <a href="https://wyt-rails.herokuapp.com/auth/yahoo_auth">Sign In with Yahoo</a>
            </li>
            </ul>
        </nav>
    )
}

export default NavBar
