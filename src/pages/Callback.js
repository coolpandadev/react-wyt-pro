import { useQuery } from '../utils/Utils'
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { Navigate } from 'react-router-dom';
import { useTokenUpdater } from '../utils/Utils';

const Callback = () => {
    const [ authToken, setAuthToken] = useState(null);

    const { setLoggedIn } = useContext(SessionContext)
    let query = useQuery();
    //Decrypt token before assigning it to tokenHash
    let newToken = query.get("token");

    //need to find a way to update token state and local storage if logged in is true
    useEffect(() => {
        if (newToken !== null) {
            setLoggedIn(true)
        } else {
            console.log('Authentication Error')
        }
    },[])
    useTokenUpdater(authToken, newToken, setAuthToken )


    return <Navigate to="/leagues" />
}

export default Callback
