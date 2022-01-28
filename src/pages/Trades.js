import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { getTrades } from '../utils/Utils';


const Trades = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { isLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
    // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [trades, setTrades] = useState(null)
    const params = useParams();
    const setTradesCb = (tradeList) => {
        setTrades(tradeList)
    }

    useEffect(() => {
        getTrades(authToken, setAuthTokenCb, params?.leagueKey, setTradesCb, navigate)
    }, [location.pathname])

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className='px-4 max-w-screen-xl m-auto'>
            <p>{location.state?.leagueName}</p>
            <h2 className="text-4xl">{location.state?.teamName}</h2>
            <div>
                {trades ? trades?.map((trade, index) => (
                    <a href={`/trade/${trade?.id}`} key={trade?.id}>
                        <div className="shadow-md p-4 rounded-md flex items-center gap-x-4">
                            <h4 className="text-3xl w-3">{index + 1}</h4>
                            <div className="flex flex-col">
                                <p className="text-xs">{trade?.team_name}</p>
                                <p className="text-xs">{new Date(trade?.created_at).toLocaleString()}</p>
                            </div>
                            <img src={trade?.team_logo} className="rounded-full w-10 h-10 md-w-20 md-h-20 ml-auto"/>
                        </div>
                    </a>

                ))
                    :
                    <p>You have no trades at the moment.</p>
                }
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-2 w-screen">
                <Link
                    to={`/trades/${params?.leagueKey}/new`}
                    state={location?.state}
                    className="rounded-md py-2 px-4 m-auto w-full inline-flex justify-center items-center bg-emerald-500 text-white font-header text-lg"
                >New Trade</Link>
            </div>

        </div>
    )
}

export default Trades
