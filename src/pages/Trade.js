import React, { useEffect, useRef, useState, useContext } from 'react'
import { getTradeInfo, getComments, createComment, getOwnerTrade, deleteTrade } from '../utils/Utils'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import { CommentSection } from 'react-comments-section'

const Trade = () => {
    const { isLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
    const navigate = useNavigate();
    const commentNameRef = useRef();
    const commentDescriptionRef = useRef();
    const [tradeInfo, setTradeInfo] = useState({});
    const [comments, setComments] = useState([]);
    const { tradeId } = useParams();
    const [checkOwner, setCheckOwner] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(commentNameRef.current.value)
        console.log(commentDescriptionRef.current.value)
        let data = {
            comment: {
                name: isLoggedIn ? "User" : commentNameRef.current.value,
                description: commentDescriptionRef.current.value
            }
        }
        createComment(tradeId, data)
    }
    const handleDeleteTrade = () => {
        deleteTrade(authToken, setAuthTokenCb, tradeId).then((res) => {
            console.log(res)
            return navigate(`/trades/${tradeInfo.user_team_key.split('.').slice(0, -2).join('.')}`, {
                state: {
                    teamName: tradeInfo.user_team_name,
                    teamKey: tradeInfo.user_team_key
                }
            })
        }).catch(error => {
            return navigate(`/trades/${tradeInfo.user_team_key.split('.').slice(0, -2).join('.')}`, {
                state: {
                    teamName: tradeInfo.user_team_name,
                    teamKey: tradeInfo.user_team_key
                }
            })
        })
    }
    const back = () => {
        return navigate(`/trades/${tradeInfo.user_team_key.split('.').slice(0, -2).join('.')}`, {
            state: {
                teamName: tradeInfo.user_team_name,
                teamKey: tradeInfo.user_team_key
            }
        })
    }
    useEffect(() => {
        if (isLoggedIn) {
            getOwnerTrade(authToken, setAuthTokenCb, tradeId, setCheckOwner)
        }
    }, [])

    useEffect(() => {
        getTradeInfo(tradeId, setTradeInfo).catch(error => navigate(`/trade/expired`))
    }, [])
    useEffect(() => {
        getComments(tradeId, setComments)
    }, [])

    return (
        <div className='w-screen h-auto'>
            <h2>Trade</h2>
            <h2>{`ID: ${tradeInfo?.id}`}</h2>
            <div className='w-full h-auto flex justify-between'>
                <div className='UserInfo'>
                    <h2>{`User's Team Name: ${tradeInfo?.user_team_name}`}</h2>
                    <h2>{`User's Team Key: ${tradeInfo?.user_team_key}`}</h2>
                    <div>
                        <h2>Players to Send</h2>
                        {tradeInfo?.players_to_send && tradeInfo?.players_to_send.length !== 0 ? tradeInfo?.players_to_send.map((player) =>
                            <div key={player?.player_key} data-key={player?.player_key}>
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
                        ) : <p>No Players</p>}
                        <h2>Other Rosters</h2>
                        {tradeInfo?.user_other_rosters && tradeInfo?.user_other_rosters.length !== 0 ? tradeInfo?.user_other_rosters.map((player, index) =>
                            <div key={player?.player_key} data-key={player?.player_key}>
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
                        ) : <p>No Players</p>}
                    </div>
                </div>
                <div className='OtherInfo'>
                    <h2>{`Trader's Team Name: ${tradeInfo?.totrade_team_name}`}</h2>
                    <h2>{`Trader's Team Key: ${tradeInfo?.totrade_team_key}`}</h2>
                    <div>
                        <h2>Players to Receive</h2>
                        {tradeInfo?.players_to_receive && tradeInfo?.players_to_receive.length !== 0 ? tradeInfo?.players_to_receive.map((player, index) =>
                            <div key={player?.player_key} data-key={player?.player_key}>
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
                        ) : <p>No Players</p>}
                        <h2>Other Rosters</h2>
                        {tradeInfo?.totrade_other_rosters && tradeInfo?.totrade_other_rosters.length !== 0 ? tradeInfo?.totrade_other_rosters.map((player, index) =>
                            <div key={player?.player_key} data-key={player?.player_key}>
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
                        ) : <p>No Players</p>}
                    </div>
                </div>
            </div>
            <div className='comments w-full h-auto'>
                <h2>Comments</h2>
                <CommentSection commentsArray={comments} setComment={setComments} />
                {/* {comments && comments.length !== 0 ? comments.map((comment, index) => <div className='flex flex-col'>
                    <h2>{comment.name}</h2>
                    {<p>{comment.description}</p>}
                    <p>{`${comment.created_at.split("T")[0]} at ${comment.created_at.split("T")[1].slice(0, -8)}`}</p>
                    <p>Update</p>
                </div>) : <h3>No Comments</h3>} */}
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                {!(isLoggedIn) && <div className='flex'>
                    <label>Name:</label>
                    <input type='text' name='name' ref={commentNameRef} />
                </div>}
                <div className='flex'>
                    <label>Description:</label>
                    <textarea ref={commentDescriptionRef} />
                </div>
                <input type='submit' value='Submit' />
            </form>
            {checkOwner && <div className='flex gap-1'>
                <Link to='edit' state={tradeInfo}><button className='p-2 bg-red-300'>Edit Trade</button></Link>
                <button className='p-2 bg-red-300' onClick={() => handleDeleteTrade()}>Delete Trade</button>

            </div>}
            <button onClick={() => back()}>Back</button>
        </div>
    )
}

export default Trade
