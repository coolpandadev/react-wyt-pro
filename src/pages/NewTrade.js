import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams, useLocation, Link } from 'react-router-dom';
import { getRosterInfo } from '../utils/Utils';
import { getLeagueTeams } from '../utils/Utils';
import { data } from 'autoprefixer';

const NewTrade = () => {
  const location = useLocation()
  const {isLoggedIn} = useContext(SessionContext);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userRoster, setUserRoster] = useState(null)
  const [leagueTeams, setLeagueTeams] = useState(null)
  const [partner, setPartner] = useState({team_key: null, team_name: null, managers: null})
  const [partnerRoster, setPartnerRoster] = useState(null)
  const params = useParams();

  const setUserRosterCb = (roster) => {
      setUserRoster(roster)
  }

  const setLeagueTeamsCb = (teams) => {
    setLeagueTeams(teams)
  }

  const setPartnerRosterCb = (roster) => {
    setPartnerRoster(roster)
}

  const handleTeamChange = (e) => {
    let idx = e.target.selectedIndex
    let dataset = e.target.options[idx].dataset
    getRosterInfo(authToken, setAuthToken, params?.leagueKey, e.target.value, setPartnerRosterCb)
    setPartner((prevState) => ({
      ...prevState,
      team_key: e.target.value,
      team_name: dataset.name,
      managers: dataset.managers
    }))
  }

  useEffect(() => {
      getRosterInfo(authToken, setAuthToken, params?.leagueKey, location.state.teamKey, setUserRosterCb)
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
      <p>{params?.leagueKey}</p>
      <p>{location.state.teamName}</p>
    </div>
    <div>
      {
        userRoster ? 
          userRoster?.map((player) => 
            <div key={player?.player_key} data-key={player?.player_key}>
              <p>{player?.player_name}</p> 
              <p>{player?.team_abbr}</p>
              <p>{player?.player_positions}</p>  
              <img src={player?.player_image} />
              <div className="flex flex-col">
                <div className="flex">
                  {Object.keys(player?.stats).map((category, index) => <div key={index}><p>{category}</p></div>)}
                </div>
                <div className="flex">
                  {Object.values(player?.stats).map((value, index) => <div key={index}><p>{value}</p></div>)}
                </div>
              </div>
            </div>
          )
        : <>
          <p>
              This league is currently inactive
          </p>
          <Link to="/">Back button here</Link>
        </>
        }
    </div>
    { userRoster ?
      <>
        <div>
        <label htmlFor="role">Choose a team to trade with:</label>
          < select
              onChange={e => handleTeamChange(e)}
              className="browser-default custom-select" >
              {
                  leagueTeams?.map((team) => 
                    <option 
                    key={team?.team_key} 
                    value={team?.team_key} 
                    data-name={team?.team_name}
                    data-managers={Object.values(team?.manager).join(" & ")}
                    >
                      {team?.team_name}
                    </option>)
              }
          </select >
      </div>
      <div>
          <p>Manager/s: {partner?.managers}</p>
      </div>

      {
        partnerRoster ? 
          partnerRoster?.map((player) => 
            <div key={player?.player_key} data-key={player?.player_key}>
              <p>{player?.player_name}</p> 
              <p>{player?.team_abbr}</p>
              <p>{player?.player_positions}</p>  
              <img src={player?.player_image} />
              <div className="flex flex-col">
                <div className="flex">
                  {Object.keys(player?.stats).map((category, index) => <div key={index}><p>{category}</p></div>)}
                </div>
                <div className="flex">
                  {Object.values(player?.stats).map((value, index) => <div key={index}><p>{value}</p></div>)}
                </div>
              </div>
            </div>
          )
        : <>
          <p>
              This league is currently inactive
          </p>
          <Link to="/">Back button here</Link>
        </>
        }
      </>
      :
      null
    }
    </>
  );
};

export default NewTrade;
