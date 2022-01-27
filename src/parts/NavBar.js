import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Link } from 'react-router-dom'
import { userLogout } from '../utils/Utils';
import Button from '../components/Button';
import LinkButton from '../components/LinkButtons';

const NavBar = () => {
    const { isLoggedIn, setLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
    // const [authToken, setAuthToken] = useState(null);

    const handleClick = () => {
        userLogout(authToken, setAuthTokenCb, setLoggedIn)
    }

    return (
        <nav className="p-4 bg-white fixed top-0 left-0 right-0 border-b border-slate-200 z-50">
            <ul className="flex">
            <li className="mr-5">
                <Link to="/" className="font-logo text-3xl">WYT?</Link>
            </li>
            { isLoggedIn ? 
                <Button cb={()=>handleClick()} color="bg-slate-700" classnames="text-white ml-auto">Logout</Button>
            :
                <li className="ml-auto">
                    <LinkButton 
                        url="https://wyt-rails.herokuapp.com/auth/yahoo_auth" 
                        color="bg-emerald-500" 
                        classnames="text-white"
                    >Sign In with Yahoo</LinkButton>
                </li>
                }

            </ul>
        </nav>
    )
}

export default NavBar
