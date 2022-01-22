import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams } from 'react-router-dom';
import { getRosterInfo } from '../utils/Utils';
import { getLeagueTeams } from '../utils/Utils';

const NewTrade = ({location}) => {

  const {isLoggedIn} = useContext(SessionContext);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userTeam, setUserTeam] = useState(null)
  const [leagueTeams, setleagueTeams] = useState(null)
  const [partner, setPartner] = useState({team_key: null, team_name: null, managers: null})
  const [partnerTeam, setPartnerTeam] = useState(null)
  const params = useParams();

  const setUserTeamCb = (roster) => {
      setUserTeam(roster)
  }

  const setLeagueTeamsCb = (teams) => {
    setleagueTeams(teams)
  }

  const handleTeamChange = (e) => {
    getRosterInfo = (authToken, setAuthToken, params?.leagueKey, e.target.value, setUserTeamCb)
    setPartner({
      team_key: e.target.value
    })
  }

  useEffect(() => {
      getUserRoster(authToken, setAuthToken, params?.leagueKey, location.state.teamKey, setUserRosterCb)
      getLeagueTeams(authToken, setAuthToken, params?.leagueKey, setLeagueTeamsCb)
  },[])

  
  // get current user's roster
  // get teams in league
  // get roster of player to trade with 

  if (!isLoggedIn) {
      return <Navigate to="/" />;
  }


  return (
    <>
    <div>
      <label for="role">Choose a team to trade with:</label>
        < select
            onChange={e => handleTeamChange(e)}
            className="browser-default custom-select" >
            {
                leagueTeams.map((team) => 
                  <option 
                  key={team?.team_key} 
                  value={team?.team_key} 
                  data-name={team?.team_name}>
                    {team?.team_name}
                  </option>)
            }
        </select >
    </div>
    <div>
        <p>Manager/s: {Object.values(partner?.managers).map(manager => (<span>{manager}</span>))}</p>
    </div>
    </>
  );
};

export default NewTrade;
