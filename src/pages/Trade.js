import React, { useEffect, useState } from 'react'
import { getTradeInfo } from '../utils/Utils'
import { useParams } from 'react-router-dom'

const Trade = () => {
    const [tradeInfo, setTradeInfo] = useState({})
    const { tradeId } = useParams()
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    useEffect(() => {
        getTradeInfo(authToken, setAuthToken, tradeId, setTradeInfo)
    }, [])
    return (
        <div>
            <h2>Trade</h2>
        </div>
    )
}

export default Trade
