import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams } from 'react-router-dom';
import { getUserRoster } from '../utils/Utils';

const NewTrade = ({location}) => {

  const {isLoggedIn} = useContext(SessionContext);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userRoster, setUserRoster] = useState(null)
  const params = useParams();

  const setUserRosterCb = (roster) => {
      setUserRoster(roster)
  }

  useEffect(() => {
      getUserRoster(authToken, setAuthToken, params?.leagueKey, location.state.teamKey, setUserRosterCb)
  },[])

  // get current user's roster
  // get teams in league
  // get roster of player to trade with 

  if (!isLoggedIn) {
      return <Navigate to="/" />;
  }


  return <div></div>;
};

export default NewTrade;
