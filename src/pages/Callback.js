import { useQuery } from '../utils/Utils'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { Navigate } from 'react-router-dom';
import { useTokenUpdater } from '../utils/Utils';
import { Buffer } from 'buffer';

const Callback = () => {
    const { setLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext)
    let query = useQuery();
    //Decrypt token before assigning it to tokenHash
    let newToken = Buffer.from(query.get("token"), "base64").toString();

    //need to find a way to update token state and local storage if logged in is true
    useEffect(() => {
        if (newToken !== null) {
            setLoggedIn(true)
            if (newToken !== authToken) {
                setAuthTokenCb(newToken)
            }
        } else {
            console.log('Authentication Error')
        }
    }, [])


    return <Navigate to="/leagues" />
}

export default Callback
