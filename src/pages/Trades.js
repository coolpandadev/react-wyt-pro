import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams, Link } from 'react-router-dom';
import { getTrades } from '../utils/Utils';


const Trades = ({location}) => {

    const {isLoggedIn} = useContext(SessionContext);
    const [ authToken, setAuthToken ] = useState(localStorage.getItem('authToken'));
    const [trades, setTrades] = useState(null)
    const params = useParams();

    const setTradesCb = (tradeList) => {
        setTrades(tradeList)
    }

    useEffect(() => {
        getTrades(authToken, setAuthToken, params?.leagueKey, setTradesCb)
    },[])

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    
    return (
        <>
        <div>{location.state.teamName}</div>
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
            to={{
                pathname: `/trades/${params?.leagueKey}/new`,
                state: location.state
            }}
        >Create Trade</Link>
        </>
    )
}

export default Trades
