import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate, Link } from 'react-router-dom';
import { getLeagues, getUserData } from '../utils/Utils';


const Leagues = () => {

    const { isLoggedIn, authToken, setAuthTokenCb, setUserData } = useContext(SessionContext);
    // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const [leagues, setLeagues] = useState(null)
    const setLeaguesCb = (leagueInfo) => {
        setLeagues(leagueInfo)
    }
    useEffect(() => {
        getUserData(authToken, setUserData)
    }, [])
    useEffect(() => {
        getLeagues(authToken, setAuthTokenCb, setLeaguesCb)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className='px-4 max-w-screen-xl m-auto'>
            <h2 className="uppercase text-4xl mb-4">Leagues</h2>

            <div className="flex flex-wrap sm:flex-nowrap w-full m-auto gap-y-4 sm:gap-x-4">
                {leagues && leagues?.map(league => (
                    <Link
                        key={league?.team?.team_key}
                        to={`/trades/${league?.league_key}`}
                        state={{
                            teamKey: league?.team?.team_key,
                            teamName: league?.team?.team_name,
                            leagueName: league?.league_name
                        }}
                        className="w-full"
                    >
                        <div className="shadow-md p-4 rounded-md flex flex-col justify-between w-full">
                            <div className="flex gap-x-4 items-center">
                                <img className="rounded-full w-10 h-10 md-w-20 md-h-20" src={league?.team?.logo_url} />
                                <div>
                                    <p className="text-xs">{league?.league_name}</p>
                                    <p className="font-header text-md">{league?.team?.team_name}</p>
                                    <p className="text-xs">{league?.scoring_type} - {league?.num_teams} Team</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default Leagues
