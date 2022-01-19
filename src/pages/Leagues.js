import {useContext} from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom';


const Leagues = () => {

    const {isLoggedIn} = useContext(SessionContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <h2>Leagues</h2>
        </div>
    )
}

export default Leagues
