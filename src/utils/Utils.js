import React from "react";
import axios from 'axios'


import { useLocation } from "react-router-dom"
import { useEffect } from "react";

export const useQuery = () => {
    const { search } = useLocation();

    // useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const useTokenUpdater = (oldToken, newToken, setAuthToken) => {
    if (oldToken !== newToken) {
        setAuthToken(newToken)
    }
    useEffect(() => {
        localStorage.setItem('authToken', newToken)
    }, [oldToken])
}


export const getLeagues = (token, setAuthToken, setLeagues) => {

    var config = {
        method: 'GET',
        url: 'https://wyt-rails.herokuapp.com/api/leagues',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };

    axios(config)
        .then((response) => {
            setLeagues(response.data);
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
        })
        .catch((error) => {
            if (error.response) {
                console.log(config.headers)
                const errMsg = error.response.data.errors
                //Display toast error with error message from response
                // toggleToast(true);
                // updateToastStat('error', errMsg)
                // updateToastMsg(`${error.response.data.errors.full_messages}.`)
            }
        });
};


export const getTrades = (token, setAuthToken, leagueKey, setTrades) => {

    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/trades?league_key=${leagueKey}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };

    axios(config)
        .then((response) => {
            setTrades(response.data.length !== 0 ? response.data : null);
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
        })
        .catch((error) => {
            if (error.response) {
                console.log(config.headers)
                const errMsg = error.response.data.errors
                //Display toast error with error message from response
                // toggleToast(true);
                // updateToastStat('error', errMsg)
                // updateToastMsg(`${error.response.data.errors.full_messages}.`)
            }
        });
};

export const getRosterInfo = (token, setAuthToken, leagueKey, teamKey, setRoster) => {

    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/roster_with_stats?league_key=${leagueKey}&team_key=${teamKey}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };

    axios(config)
        .then((response) => {
            setRoster(response.data.roster);
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
        })
        .catch((error) => {
            if (error.response) {
                console.log(config.headers)
                const errMsg = error.response.data.errors
                //Display toast error with error message from response
                // toggleToast(true);
                // updateToastStat('error', errMsg)
                // updateToastMsg(`${error.response.data.errors.full_messages}.`)
            }
        });
};


export const getLeagueTeams = (token, setAuthToken, leagueKey, setTeams) => {
    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/teams?league_key=${leagueKey}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
    };
    axios(config)
        .then((response) => {
            setTeams(response.data.league_teams);
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
        })
        .catch((error) => {
            if (error.response) {
                console.log(config.headers)
                const errMsg = error.response.data.errors
                //Display toast error with error message from response
                // toggleToast(true);
                // updateToastStat('error', errMsg)
                // updateToastMsg(`${error.response.data.errors.full_messages}.`)
            }
        });
};

export const getTradeInfo = (token, setAuthToken, tradeId, setTradeInfo) => {
    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    axios(config)
        .then((response) => {
            setTradeInfo(response.data)
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
        })
        .catch((error) => {
            if (error.response) {
                console.log(config.headers)
                const errMsg = error.response.data.errors
                //Display toast error with error message from response
                // toggleToast(true);
                // updateToastStat('error', errMsg)
                // updateToastMsg(`${error.response.data.errors.full_messages}.`)
            }
        });
};
export const getComments = (tradeId, setCommentInfo) => {
    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}/comments`
    }
    axios(config).then(response => setCommentInfo(response.data)).catch(error => console.log(error))
}

export const createComment = (tradeId, data) => {
    var config = {
        method: 'POST',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}/comments`,
        data
    }
    axios(config).then(response => console.log(response)).catch(error => console.log(error))
}



export const createTrade = (token, setAuthToken, leagueKey, trade) => {
    var config = {
        method: 'POST',
        url: `https://wyt-rails.herokuapp.com/api/create_trade?league_key=${leagueKey}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data: {
            trade: {
                team_key: trade.teamKey,
                team_name: trade.teamName
            },
            players_to_send: trade.players_to_send,
            players_to_receive: trade.players_to_receive
        }
    }
    axios(config)
        .then((response) => {
            //success toast here
            console.log(response.data.data.message)
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
        })
        .catch((error) => {
            if (error.response) {
                console.log(config.headers)
                const errMsg = error.response.data.errors
                //Display toast error with error message from response
                // toggleToast(true);
                // updateToastStat('error', errMsg)
                // updateToastMsg(`${error.response.data.errors.full_messages}.`)
            }
        });
};
