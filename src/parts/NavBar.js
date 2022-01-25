import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Link } from 'react-router-dom'
import { userLogout } from '../utils/Utils';

const NavBar = () => {
    const {isLoggedIn, setLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
    // const [authToken, setAuthToken] = useState(null);

    const handleClick = () => {
        userLogout(authToken, setAuthTokenCb, setLoggedIn)
    }

    return (
        <nav className="p-4">
            <ul className="flex">
            <li className="mr-5">
                <Link to="/" className="font-logo text-xl">WYT?</Link>
            </li>
            { isLoggedIn ? 
                <button onClick={()=>handleClick()}>Logout</button>
            :
                <li className="ml-auto bg-red-400">
                    <a href="https://wyt-rails.herokuapp.com/auth/yahoo_auth">Sign In with Yahoo</a>
                </li>
            }
                
            </ul>
        </nav>
    )
}

export default NavBar
