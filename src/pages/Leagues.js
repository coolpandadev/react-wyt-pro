import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom';
import { getLeagues } from '../utils/Utils';


const Leagues = () => {

    const {isLoggedIn} = useContext(SessionContext);
    const [ authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const [leagues, setLeagues] = useState(null)
    const setLeaguesCb = (leagueInfo) => {
        setLeagues(leagueInfo)
    }

    useEffect(() => {
        getLeagues(authToken, setAuthToken, setLeaguesCb)
    },[])

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            {leagues && leagues?.map(league => (<h2>{league?.league_key}</h2>))}
        </div>
    )
}

export default Leagues
