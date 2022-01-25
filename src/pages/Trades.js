import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams, Link, useLocation } from 'react-router-dom';
import { getTrades } from '../utils/Utils';


const Trades = () => {
    const location = useLocation()
    const { isLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
    // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [trades, setTrades] = useState(null)
    const params = useParams();
    console.log("Trades go first")
    const setTradesCb = (tradeList) => {
        setTrades(tradeList)
    }

    useEffect(() => {
        getTrades(authToken, setAuthTokenCb, params?.leagueKey, setTradesCb)
    }, [location.pathname])

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div>{location.state?.teamName}</div>
            <div>
                {trades ? trades?.map(trade => (
                    <a href={`/trade/${trade?.id}`} key={trade?.id}>
                        <div>
                            <p>{trade?.created_at}</p>
                            <p>{trade?.team_name}</p>
                            <p>{trade?.team_key}</p>
                        </div>
                    </a>

                ))
                    :
                    <p>You have no trades at the moment.</p>
                }
            </div>
            <Link
                to={`/trades/${params?.leagueKey}/new`}
                state={location?.state}
            >Create Trade</Link>
        </>
    )
}

export default Trades
