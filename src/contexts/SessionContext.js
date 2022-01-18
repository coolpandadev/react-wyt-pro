import {useState, createContext, useEffect} from 'react';

//We first create a context--similar to State, but mutable and can be accessed by any consumer/child by using useContext 
export const SessionContext = createContext();

const SessionContextProvider = ({children}) => {
    
    //These are the states we're initializing to store component data related to user Login/Authentication status and their authentication credentials

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const setLoggedIn = (bool) => {
        setIsLoggedIn(bool)
    }

    //Initialize Token States and pull from local storage
    const [ authToken, setAuthToken] = useState({
        access_token: '',
        refresh_token: '',
        expiry: '',
    });
    const setAuthTokenValues = (authTokens) => {
        setAuthToken({
            access_token: authTokens.access_token,
            refresh_token: authTokens.refresh_token,
            expiry: authTokens.expiry
        })
    }

    
    //Pull LoggedInstate data from local storage and set current states to that on mount
    useEffect(()=>{
        setLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn')));
        setAuthTokenValues(JSON.parse(localStorage.getItem('authTokens')));
    },[])

    useEffect(()=>{
        localStorage.setItem('authTokens', JSON.stringify(authToken));
    },[authToken])

    const props = {
        isLoggedIn,
        setLoggedIn,
        authToken
    }

    return (
        //We add the Provider property from the created SessionContext object which will provide all children with necessary values/states without
        //passing them directly as props. In this case, we pass our user login states and updaters to the value prop of Provider,
        //so we can access these in children components using useContext
        <SessionContext.Provider value={props}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionContextProvider
