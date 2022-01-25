import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { updateTrade } from '../utils/Utils'


function EditTrade() {
    const { tradeId } = useParams()
    const { state } = useLocation()
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const { players_to_receive, players_to_send, user_other_rosters, totrade_other_rosters, user_team_name, totrade_team_key, user_team_key, totrade_team_name } = state
    let players_to_send_container = []
    let players_to_receive_container = []
    let user_rosters = [...players_to_send, ...user_other_rosters]
    let totrade_rosters = [...players_to_receive, ...totrade_other_rosters]
    players_to_send.forEach(player => {
        let obj = {
            player_key: player.player_key,
            player_name: player.player_name
        }
        players_to_send_container.push(obj)
    })
    players_to_receive.forEach(player => {
        let obj = {
            player_key: player.player_key,
            player_name: player.player_name
        }
        players_to_receive_container.push(obj)
    })
    const handleSubmit = () => {
        let data = {
            "players_to_send": playersToSend,
            "players_to_receive": playersToReceive,
        }
        updateTrade(authToken, setAuthToken, tradeId, data)
    }
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

    useEffect(() => {
        setUserRoster([...user_rosters])
    }, [])
    useEffect(() => {
        setPartnerRoster([...totrade_rosters])
    }, [])
    useEffect(() => {
        let emptyArray = []
        user_rosters.forEach(roster => {
            if (players_to_send.find(player => player.player_key === roster.player_key)) {
                emptyArray.push(true)
            }
            else {
                emptyArray.push(false)
            }
        })
        setUserCheckedState([...emptyArray])
    }, [])

    useEffect(() => {
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

    return <div className=''>
        <div>
            <h2>{`User's Team Name: ${user_team_name}`}</h2>
            <h2>{`User's Team Key: ${user_team_key}`}</h2>
            {
                userRoster ?
                    userRoster?.map((player, index) =>
                        <div key={player?.player_key}>
                            <input
                                type="checkbox"
                                id="player_to_send"
                                name="player_to_send"
                                value={player?.player_key}
                                checked={userCheckedState[index] || false}
                                onChange={() => handleUserPlayerSelect(index)}
                            />
                            <p>{player?.player_name}</p>
                            <p>{player?.team_abbr}</p>
                            <p>{player?.player_positions}</p>
                            <img src={player?.player_image} />
                            <div className="flex flex-col">
                                <div className="flex">
                                    {Object.keys(player?.stats).map((category, index) => <div key={index}><p>{category}</p></div>)}
                                </div>
                                <div className="flex">
                                    {Object.values(player?.stats).map((value, index) => <div key={index}><p>{value}</p></div>)}
                                </div>
                            </div>
                        </div>
                    )
                    : <>
                        <p>
                            Team not available
                        </p>
                    </>
            }
        </div>
        <div>
            <h2>{`User's Team Name: ${totrade_team_name}`}</h2>
            <h2>{`User's Team Key: ${totrade_team_key}`}</h2>
            {
                partnerRoster ?
                    partnerRoster?.map((player, index) =>
                        <div key={player?.player_key}>
                            <input
                                type="checkbox"
                                id="player_to_send"
                                name="player_to_send"
                                value={player?.player_key}
                                checked={partnerCheckedState[index] || false}
                                onChange={() => handlePartnerPlayerSelect(index)}
                            />
                            <p>{player?.player_name}</p>
                            <p>{player?.team_abbr}</p>
                            <p>{player?.player_positions}</p>
                            <img src={player?.player_image} />
                            <div className="flex flex-col">
                                <div className="flex">
                                    {Object.keys(player?.stats).map((category, index) => <div key={index}><p>{category}</p></div>)}
                                </div>
                                <div className="flex">
                                    {Object.values(player?.stats).map((value, index) => <div key={index}><p>{value}</p></div>)}
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <>
                        <p>
                            Team not available
                        </p>
                    </>
            }
        </div>
        <button onClick={() => handleSubmit()}>Update</button>
    </div>;
}

export default EditTrade;
