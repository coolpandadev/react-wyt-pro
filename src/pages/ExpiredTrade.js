import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'

function ExpiredTrade() {
    const { isLoggedIn } = useContext(SessionContext);
    const navigate = useNavigate();
    const handleBack = () => {
        return navigate(`/`)
    }
    return <div>
        <h2>Expired Trade</h2>
        <p>Trade Expired 🙁</p>
        <button onClick={() => handleBack()}>Go back</button>
    </div>;
}

export default ExpiredTrade;
