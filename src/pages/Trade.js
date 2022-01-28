import React, { useEffect, useRef, useState, useContext } from 'react'
import { getTradeInfo, getComments, createComment, getOwnerTrade, deleteTrade, getUserData } from '../utils/Utils'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import Button from '../components/Button'
import LastSeen from '../components/LastSeen'
import ReadOnlyPlayerCard from '../parts/ReadOnlyPlayerCard'

const Trade = () => {
    const { isLoggedIn, authToken, setAuthTokenCb, userData, setUserData } = useContext(SessionContext);
    const { full_name } = userData
    const navigate = useNavigate();
    const commentNameRef = useRef();
    const commentDescriptionRef = useRef();
    const [tradeInfo, setTradeInfo] = useState({});
    const [comments, setComments] = useState([]);
    const { tradeId } = useParams();
    const [checkOwner, setCheckOwner] = useState(false);
    // const [cleanTradeData, setCleanData] = useState({ cleanPlayersToSend: [], cleanPlayersToReceive: [] })
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(commentNameRef.current.value)
        // console.log(commentDescriptionRef.current.value)
        let data = {
            comment: {
                name: isLoggedIn ? full_name : commentNameRef.current.value,
                description: commentDescriptionRef.current.value
            }
        }
        console.log(data)
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
    // const back = () => {
    //     return navigate(`/trades/${tradeInfo.user_team_key.split('.').slice(0, -2).join('.')}`, {
    //         state: {
    //             teamName: tradeInfo.user_team_name,
    //             teamKey: tradeInfo.user_team_key
    //         }
    //     })
    // }

    const rtf = new Intl.RelativeTimeFormat("en", {
        localeMatcher: "best fit", // other values: "lookup"
        numeric: "auto", // other values: "auto"
        style: "long", // other values: "short" or "narrow"
    });

    useEffect(() => {
        if (isLoggedIn) {
            getOwnerTrade(authToken, setAuthTokenCb, tradeId, setCheckOwner)
            getUserData(authToken, setAuthTokenCb, setUserData)
        }
    }, [])

    useEffect(() => {
        getTradeInfo(tradeId, setTradeInfo).catch(error => navigate(`/trade/expired`))
    }, [])
    useEffect(() => {
        getComments(tradeId, setComments)
    }, [comments])

    return (
        <div className='flex flex-col px-4 max-w-screen-xl m-auto pb-20'>

            <div className="pt-4">
                <p>{tradeInfo?.league_name}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
                <div className="flex flex-col gap-y-4 overflow-x-auto md:w-[46%] md:pr-4">
                    <h2 className="text-4xl sticky top-0 left-0 pt-8">{tradeInfo?.user_team_name}</h2>
                    {tradeInfo.players_to_send ?
                        tradeInfo.players_to_send?.map((player, index) =>
                            <ReadOnlyPlayerCard
                                key={index}
                                player={player}
                                active={true}
                            />
                        )
                        : <>
                            <p>
                                NO PLAYER DATA
                            </p>
                            <Link to="/">Back button here</Link>
                        </>
                    }
                    {tradeInfo.user_other_rosters ?
                        tradeInfo.user_other_rosters?.map((player, index) =>
                            <ReadOnlyPlayerCard
                                key={index}
                                player={player}
                                active={false}
                            />
                        )
                        : null
                    }
                </div>
                <div className="flex flex-col gap-y-4 overflow-x-auto mt-8 border-t border-slate-400 md:mt-0 md:w-[46%] md:border-t-0 md:border-l md:pl-4">
                    <h2 className="text-4xl sticky top-0 left-0 pt-8 md:mt-0">{tradeInfo?.totrade_team_name}</h2>
                    {tradeInfo.players_to_receive ?
                        tradeInfo.players_to_receive?.map((player, index) =>
                            <ReadOnlyPlayerCard
                                key={index}
                                player={player}
                                active={true}
                            />
                        )
                        : <>
                            <p>
                                NO PLAYER DATA
                            </p>
                            <Link to="/">Back button here</Link>
                        </>
                    }
                    {tradeInfo.totrade_other_rosters ?
                        tradeInfo.totrade_other_rosters?.map((player, index) =>
                            <ReadOnlyPlayerCard
                                key={index}
                                player={player}
                                active={false}
                            />
                        )
                        : null
                    }
                </div>
            </div>

            {checkOwner && 
            <div className="ml-auto pt-8">
                <Button children={"Delete Trade"} cb={() => handleDeleteTrade()} classnames={"text-red-500"} color={"bg-white"} />
                <Link to='edit' state={tradeInfo}><Button color={"bg-slate-700"} classnames={"text-white ml-4"} children={"Edit Trade"} /></Link>
            </div>
            }
            <div className="comments w-full h-auto px-3 pt-8">
                {<h2 className="text-2xl">{`Comments (${comments?.length})`}</h2>}
                <hr className="py-1"/>
                {comments && comments.length !== 0 ? comments.map((comment) => <div key={comment.id} className="flex flex-col py-2 items-start gap-x-4 border-b border-slate-200">
                    <div className="flex justify-between w-full items-center">
                        <h2>{comment.name}</h2>
                        <LastSeen date={comment.created_at} classnames="text-xs text-slate-500 ml-auto"/>
                    </div>
                    {<p className="capitalize pt-2 text-slate-700 text-sm">{comment.description}</p>}
                    {/* <p className="text-gray-400">{`${comment.created_at.split("T")[0]} at ${comment.created_at.split("T")[1].slice(0, -8)}`}</p> */}
                </div>) : <h3 className="text-center">No Comments yet</h3>}
            </div>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
                {!(isLoggedIn) && <div className='flex'>
                    <label>Name:</label>
                    <input type='text' name='name' ref={commentNameRef} />
                </div>}
                <div className='flex'>
                    <textarea className='rounded-md bg-stone-100 resize-none w-full mt-8 mx-3 px-4 py-2 h-20 text-xs' ref={commentDescriptionRef} placeholder="Comment here"/>
                </div>
                <Button cb={handleSubmit} color="bg-emerald-500" type="submit" classnames="text-white self-end mt-4 mr-3">Submit</Button>
            </form>

            {/* <Button color={"bg-slate-700"} classnames={"text-white ml-auto"} children={"Back"} cb={() => back()} /> */}
            {/* <button onClick={() => back()}>Back</button> */}
        </div>
    )
}

export default Trade
