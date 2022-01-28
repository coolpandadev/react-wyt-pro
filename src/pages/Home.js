import { useContext } from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom';
import kobelogo from '../assets/home/pexels-photo-2304351.jpeg'
import logo from '../assets/home/green-freek.svg'
import LinkButton from '../components/LinkButtons';

const Home = () => {

    const { isLoggedIn } = useContext(SessionContext);

    if (isLoggedIn) {
        return <Navigate to="/leagues" />;
    }

    //This page will contain information about the site as well as graphics 
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full h-full flex text-white'>
                <div className='w-full pt-64 md:pt-72 flex flex-col justify-center items-center gap-5 px-3 relative bottom-10'>
                    <h1 className='text-center text-3xl md:text-6xl'>Easier Forum shopping for Fantasy Basketball trades</h1>
                    <p className='text-center md:text-xl'>Sending trade ideas to your friends is as simple as sending a link!</p>
                    <LinkButton 
                        url="https://wyt-rails.herokuapp.com/auth/yahoo_auth" 
                        color="bg-emerald-500" 
                        classnames="text-white mt-24 text-2xl"
                    >Sign In with Yahoo</LinkButton>
                </div>

            </div>
            {/* <div className='w-full h-[auto] flex justify-center items-center lg:h-screen'>
                <div className='w-full h-auto flex flex-col md:flex-row justify-end items-center md:px-10 lg:px-[8em] xl:px-[10em]'>
                    <div className='w-full h-[700px`] flex flex-col justify-start items-center lg:items-start gap-[30px] xl:w-[50%]'>
                        <h1 className='uppercase font-bold text-[2.2em] align-middle text-center'>Lorem Ipsum Dolor</h1>
                        <p className='align-middle text-center text-[30px] font-body lg:text-left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Velit scelerisque in dictum non. Arcu dui vivamus arcu felis</p>
                        <button className='uppercase font-bold p-2 bg-green-500 hover:bg-green-400 rounded-md text-white text-[22px] font-body sm:text-[28px] mb-3'>Lorem Ipsum</button>
                    </div>
                    <img src={logo} className='w-[100%] h-[auto] sm:w-[390px] xl:w-[50%]' />
                </div>
            </div> */}
            <div className='absolute top-0 w-full h-screen z-[-999] bg-kobelogo bg-center bg-cover bg-no-repeat bg-blend-overlay bg-slate-700' />
        </div>
    )
}

export default Home
