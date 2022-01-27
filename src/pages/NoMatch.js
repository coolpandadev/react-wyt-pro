import React from 'react'
import greekfreek from '../assets/home/green-freek.svg'
import { useNavigate } from 'react-router-dom'


const NoMatch = () => {
    const navigate = useNavigate()
    const handleBack = () => {
        return navigate(`/`)
    }
    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center gap-3 px-5 sm:px-[5em]'>
            <img className='w-[90%] h-[350px]' src={greekfreek} />
            <h1 className='font-body font-bold text-[3em] md:text-[4em]'>Oh no! Page not found!</h1>
            <p className='font-body text-[1.5em] sm:text-center md:text-[1.8em]'>We are sorry for the inconvenience! It looks like you are trying to access a page that never existed</p>
            <button onClick={() => handleBack()} className='bg-emerald-500 hover:bg-emerald-400 px-3 py-2 rounded-md font-body text-[1.5em] md:text-[1.9em]'>Back to Home</button>
        </div>
    )
}

export default NoMatch
