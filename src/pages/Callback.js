import { useQuery } from '../utils/Utils'
import { useContext, React } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { Navigate } from 'react-router-dom';

const Callback = () => {
    const { setAuthTokenValues } = useContext(SessionContext)
    let query = useQuery();
    //Decrypt token before assigning it to tokenHash
    let tokens = { 
        access_token: query.get("token"),
        refresh_token: query.get("refresh"),
        expiry: query.get("expiry"),
    }

    setAuthTokenValues(tokens)
    return <Navigate to="leagues" />
}

export default Callback
