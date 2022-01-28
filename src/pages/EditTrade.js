import React, { useContext,useState, useEffect } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { updateTrade } from '../utils/Utils'
import PlayerCard from '../parts/PlayerCard';
import StickyButton from '../parts/StickyButton';


function EditTrade() {
    const navigate = useNavigate();
    const { tradeId } = useParams()
    const { state } = useLocation()
    const { isLoggedIn, authToken, setAuthTokenCb} = useContext(SessionContext);
    const { players_to_receive, players_to_send, user_other_rosters, totrade_other_rosters, user_team_name, totrade_team_key, league_name, totrade_team_name } = state
    const [userCheckedState, setUserCheckedState] = useState([]);
    const [playersToSend, setPlayersToSend] = useState([]);
    const [playersToReceive, setPlayersToReceive] = useState([]);
    const [userRoster, setUserRoster] = useState([])
    const [partnerRoster, setPartnerRoster] = useState([])
    const [partnerCheckedState, setPartnerCheckedState] = useState([]);
    const handleUserPlayerSelect = (selectedIndex) => {
        let updatedUserCheckedState = userCheckedState.map((bool, stateIndex) => stateIndex === selectedIndex ? !bool : bool)
        setUserCheckedState(updatedUserCheckedState)
    }

    const handlePartnerPlayerSelect = (selectedIndex) => {
        let updatedPartnerCheckedState = partnerCheckedState.map((bool, stateIndex) => stateIndex === selectedIndex ? !bool : bool)
        setPartnerCheckedState(updatedPartnerCheckedState)
    }

    let clean_players_to_send = []
    let clean_players_to_receive = []
    // let players_to_send_container = []
    // let players_to_receive_container = []
    players_to_send.forEach(player => {
        if (!(player.player_name === 'Dropped')) {
            clean_players_to_send.push(player)
        }
    })
    players_to_receive.forEach(player => {
        if (!(player.player_name === 'Dropped')) {
            clean_players_to_receive.push(player)
        }
    })
    let user_rosters = [...clean_players_to_send, ...user_other_rosters]
    let totrade_rosters = [...clean_players_to_receive, ...totrade_other_rosters]
    // clean_players_to_send.forEach(player => {
    //     let obj = {
    //         player_key: player.player_key,
    //         player_name: player.player_name
    //     }
    //     players_to_send_container.push(obj)
    // })
    // clean_players_to_receive.forEach(player => {
    //     let obj = {
    //         player_key: player.player_key,
    //         player_name: player.player_name
    //     }
    //     players_to_receive_container.push(obj)
    // })
  

    const updateUserCheckedState = () => {
        let emptyArray = []
        user_rosters.forEach(roster => {
            if (clean_players_to_send.find(player => player.player_key === roster.player_key)) {
                emptyArray.push(true)
            }
            else {
                emptyArray.push(false)
            }
        })
        setUserCheckedState([...emptyArray])
    }

    const updatePartnercheckedState = () => {
        let emptyArray = []
        totrade_rosters.forEach(roster => {
            if (players_to_receive.find(player => player.player_key === roster.player_key)) {
                emptyArray.push(true)
            }
            else {
                emptyArray.push(false)
            }
        })
        setPartnerCheckedState([...emptyArray])
    }

    useEffect(() => {
        setUserRoster([...user_rosters]);
        setPartnerRoster([...totrade_rosters]);
        updateUserCheckedState();
        updatePartnercheckedState();
    }, [])

    useEffect(() => {
        let playerKeys = []
        partnerCheckedState.forEach((bool, index) => bool && playerKeys.push({ player_key: partnerRoster[index].player_key, player_name: partnerRoster[index].player_name }))
        setPlayersToReceive(playerKeys)
    }, [partnerCheckedState])

    useEffect(() => {
        let playerKeys = []
        userCheckedState.forEach((bool, index) => bool && playerKeys.push({ player_key: userRoster[index].player_key, player_name: userRoster[index].player_name }))
        setPlayersToSend(playerKeys)
    }, [userCheckedState])

    const handleSubmit = () => {
        let data = {
            "players_to_send": playersToSend,
            "players_to_receive": playersToReceive,
        }
        updateTrade(authToken, setAuthTokenCb, tradeId, data).then(res => {
            return navigate(`/trade/${tradeId}`)
        }).catch(error => {
            return navigate(`/trade/${tradeId}`)
        })
    }

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex flex-col px-4 max-w-screen-xl m-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="pt-4">
                    <p>{league_name}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center">

            <div className="flex flex-col gap-y-4 overflow-x-auto md:w-[46%] md:pr-4">
                <h2 className="text-4xl sticky top-0 left-0 pt-8">{user_team_name}</h2>
                    {userRoster &&
                        userRoster?.map((player, index) =>
                        <PlayerCard 
                        key={index}
                        player={player} 
                        type="send"
                        index={index} 
                        cb={handleUserPlayerSelect} 
                        checkedArr={userCheckedState} 
                        />
                    )}
            </div>
            {partnerRoster &&
                <div className="flex flex-col gap-y-4 overflow-x-auto mt-8 border-t border-slate-400 md:mt-0 md:w-[46%] md:border-t-0 md:border-l md:pl-4">
                <h2 className="text-4xl sticky top-0 left-0 pt-8 md:mt-0">{totrade_team_name}</h2>
                {partnerRoster &&
                    partnerRoster?.map((player, index) =>
                    <PlayerCard 
                        key={index}
                        player={player} 
                        type="receive"
                        index={index} 
                        cb={handlePartnerPlayerSelect} 
                        checkedArr={partnerCheckedState} 
                    />
                    )
                }
                </div>
            }
            </div>
            <StickyButton 
                cb={handleSubmit}
                classnames={ (userRoster && partnerRoster && (playersToSend?.length > 0) && (playersToReceive?.length > 0)) ? "bg-emerald-500 text-white" : "bg-slate-200 text-black" }
                >Update Trade
            </StickyButton>
        </div>
    );
}

export default EditTrade;
