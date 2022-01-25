import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate, Link } from 'react-router-dom';
import { getLeagues } from '../utils/Utils';


const Leagues = () => {

    const { isLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
    // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const [leagues, setLeagues] = useState(null)
    const setLeaguesCb = (leagueInfo) => {
        setLeagues(leagueInfo)
    }

    useEffect(() => {
        getLeagues(authToken, setAuthTokenCb, setLeaguesCb)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {leagues && leagues?.map(league => (
                <Link
                    key={league?.team?.team_key}
                    to={`/trades/${league?.league_key}`}
                    state={{
                        teamKey: league?.team?.team_key,
                        teamName: league?.team?.team_name
                    }}>
                    <div className='pointer-events-none'>
                        <p>{league?.league_key}</p>
                        <p>{league?.name}</p>
                        <p>{league?.scoring_type}</p>
                        <p>{league?.num_teams}</p>
                        <p>{league?.team?.team_key}</p>
                        <p>{league?.team?.team_name}</p>
                        <img src={league?.team?.logo_url} />
                        {Object.entries(league?.roster_positions).map(([position, count]) => (
                            <span key={position}>
                                {position}: {count} 
                            </span>
                        ))}
                    </div>
                </Link>

            ))}
        </div>
    )
}

export default Leagues
