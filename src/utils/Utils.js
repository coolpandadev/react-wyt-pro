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
            console.log(response.headers['authorization']);
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


export const getUserRoster = (token, setAuthToken, leagueKey, teamKey, setRoster) => {

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
};