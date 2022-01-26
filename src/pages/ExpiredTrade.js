import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext'
import greekfreek from '../assets/home/green-freek.svg'

function ExpiredTrade() {
    const { isLoggedIn } = useContext(SessionContext);
    const navigate = useNavigate();
    const handleBack = () => {
        return navigate(`/`)
    }
    return <div>
        <div className='w-screen h-screen flex flex-col justify-center items-center gap-3 '>
            <img className='w-[60%] h-[400px]' src={greekfreek} />
            <h1 className='font-body font-bold text-[3em]'>Oh no!</h1>
            <p className='font-body text-[1.5em]'>We are sorry for the inconvenience! It looks like you are trying to access a trade that has been deleted or an error on our database</p>
            <button onClick={() => handleBack()} className='bg-emerald-500 px-3 py-2 rounded-md font-body text-[1.5em]'>Back to Home</button>

        </div>
    </div>;
}

export default ExpiredTrade;
