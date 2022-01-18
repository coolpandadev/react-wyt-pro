import React from 'react'

const Trades = () => {

    const {isLoggedIn} = useContext(SessionContext);

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <h2>Trades</h2>
        </div>
    )
}

export default Trades
