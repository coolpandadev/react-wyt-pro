import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom';
import kobelogo from '../assets/home/pexels-photo-2304351.jpeg'
import logo from '../assets/home/green-freek.svg'

const Home = () => {

    const { isLoggedIn } = useContext(SessionContext);

    if (isLoggedIn) {
        return <Navigate to="/leagues" />;
    }

    //This page will contain information about the site as well as graphics 
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full h-screen flex text-white'>
                <div className='w-full h-full flex flex-col justify-center items-center gap-5 px-3 relative bottom-10'>
                    <h1 className='uppercase font-bold text-[2.2em] align-middle text-center'>Are you ready to have the best basketball team ever?</h1>
                    <p className='align-middle text-center text-[32px] font-body'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non. Arcu dui vivamus arcu felis.</p>
                    <button className='text-[22px] font-body uppercase font-bold p-2 bg-green-500 hover:bg-green-400 rounded-md text-white'>Lorem Ipsum</button>
                </div>

            </div>
            <div className='w-full h-auto flex justify-center items-center'>
                <div className='w-full h-auto flex flex-col-reverse justify-center items-center'>
                    <div className='w-full h-auto flex flex-col justify-center items-center gap-[30px]'>
                        <h1 className='uppercase font-bold text-[2.2em] align-middle text-center'>Lorem Ipsum Dolor</h1>
                        <p className='align-middle text-center text-[30px] font-body'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non. Arcu dui vivamus arcu felis</p>
                        <button className='uppercase font-bold p-2 bg-green-500 hover:bg-green-400 rounded-md text-white text-[22px] font-body'>Lorem Ipsum</button>
                    </div>

                    <img src={logo} className='w-[100%] h-auto flex justify-center items-center' />
                </div>
            </div>
            <div className='absolute top-0 w-full h-[850px] z-[-999] bg-kobelogo bg-center bg-cover bg-no-repeat bg-blend-overlay bg-slate-700' /> {/**  Wallpaper*/}
        </div>
    )
}

export default Home
