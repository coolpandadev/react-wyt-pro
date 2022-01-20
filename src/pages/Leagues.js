import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom';
import { getLeagues } from '../utils/Utils';


const Leagues = () => {

    const {isLoggedIn} = useContext(SessionContext);
    const [ authToken, setAuthToken ] = useState(localStorage.getItem('authToken'));

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
            {leagues && leagues?.map(league => (
                <a href={`/trades/${league?.league_key}`} key={league?.league_key}>
                    <div>
                        <p>{league?.league_key}</p>
                        <p>{league?.name}</p>
                        <p>{league?.scoring_type}</p>
                        <p>{league?.num_teams}</p>
                        <p>{league?.team?.team_key}</p>
                        <p>{league?.team?.team_name}</p>
                        <img src={league?.team?.logo_url}/>
                        {Object.entries(league?.roster_positions).map(([position, count]) => (
                            <>
                                <span>{position}</span><span>: {count} </span>
                            </>
                        ))}
                    </div>
                </a>
            
            ))}
        </div>
    )
}

export default Leagues
