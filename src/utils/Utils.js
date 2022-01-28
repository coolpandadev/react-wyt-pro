import React from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom"
import { useEffect } from "react";
import toast from "react-hot-toast";


export const userLogout = (authToken, setAuthToken, setLoggedIn) => {
    console.log(authToken)
    var config = {
        method: 'DELETE',
        url: `https://wyt-rails.herokuapp.com/auth/yahoo_auth/logout`,
        headers: {
            "Authorization": `Bearer ${authToken}`
        }
    }
    axios(config)
        .then((response) => {
            //change isLoggedIn to false
            //delete auth token
            setAuthToken(null)
            setLoggedIn(false)
            console.log(response.data.data.message)
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

export const useQuery = () => {
    const { search } = useLocation();

    // useMemo will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
const errorToast = (obj) => {
    if (obj.hasOwnProperty('error')) {
        toast.error(obj.error)
    }
    else {
        toast.error(obj.message)
    }

}

export const useTokenUpdater = (oldToken, newToken, setAuthToken) => {
    if (oldToken !== newToken) {
        setAuthToken(newToken)
    }

}


export const getUserData = (token, setAuthToken, setUserData) => {
    var config = {
        method: 'GET',
        url: 'https://wyt-rails.herokuapp.com/user',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    return axios(config).then(response => {
        setUserData(response.data)
        useTokenUpdater(token, response.headers['authorization'], setAuthToken)
    })
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

export const getTradeInfo = (tradeId, setTradeInfo) => {
    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}`,
    }
    return axios(config)
        .then((response) => {
            let newObject = { ...response.data, players_to_send: response.data.players_to_send.filter(player => player.player_name !== "Dropped"), players_to_receive: response.data.players_to_receive.filter(player => player.player_name !== "Dropped") }
            setTradeInfo(newObject)
            return response
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                errorToast(error.response.data)
                throw new Error("API Error")
            }
        })
};
export const getComments = (tradeId, setCommentInfo) => {
    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}/comments`
    }
    axios(config).then(response => {
        setCommentInfo(response.data)

    }).catch(error => errorToast(error.response.data))
}

export const createComment = (tradeId, data) => {
    var config = {
        method: 'POST',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}/comments`,
        data
    }
    axios(config).then(response => console.log(response)).catch(error => error.response.data.errors.forEach(error => toast.error(error)))
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
                team_name: trade.teamName,
                team_logo: trade.team_logo
            },
            players_to_send: trade.players_to_send,
            players_to_receive: trade.players_to_receive
        }
    }
    return axios(config)
        .then((response) => {
            //success toast here
            toast.success(response.data.message)
            console.log(response.data.id)
            console.log(response)
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
            return response.data.id
        }).catch(error => {
            errorToast(error.response.data)
            throw new Error("API Error")
        })
};

export const updateTrade = (token, setAuthToken, tradeId, data) => {
    var config = {
        method: 'PATCH',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}`,
        headers: {
            "Authorization": `Bearer ${token}`
        },
        data
    }
    return axios(config).then(response => {
        console.log(response)
        toast.success(response.data.message)
        useTokenUpdater(token, response.headers['authorization'], setAuthToken)
    }).catch(error => {
        errorToast(error.response.data)
        throw new Error("API Error")
    })
}

export const getOwnerTrade = (token, setAuthToken, tradeId, setCheckOwner) => {
    var config = {
        method: 'GET',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}/owner`,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    return axios(config).then(response => {
        console.log(response)
        setCheckOwner(response.data.message === "true")
        useTokenUpdater(token, response.headers['authorization'], setAuthToken)
    }).catch(error => {
        errorToast(error.response.data)
    })
}

export const deleteTrade = (token, setAuthToken, tradeId) => {
    var config = {
        method: 'DELETE',
        url: `https://wyt-rails.herokuapp.com/api/trades/${tradeId}`,
        headers: {
            "Authorization": `Bearer ${token}`
        }

    }
    return axios(config)
        .then((response) => {
            //success toast here
            useTokenUpdater(token, response.headers['authorization'], setAuthToken)
            toast.success(response.data.message)
            return response
        }).catch(error => {
            errorToast(error.response.data)
            throw new Error("API Error")
        })
}

