import{useContext} from 'react'
import { SessionContext } from '../contexts/SessionContext'
import { Navigate } from 'react-router-dom';

const Home = () => {

    const {isLoggedIn} = useContext(SessionContext);

    if (isLoggedIn) {
        return <Navigate to="/leagues" />;
    }

    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}

export default Home
