import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { getRosterInfo } from '../utils/Utils';
import { getLeagueTeams } from '../utils/Utils';
import { createTrade } from '../utils/Utils';
import Select from 'react-select';

const NewTrade = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, authToken, setAuthTokenCb } = useContext(SessionContext);
  // const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userRoster, setUserRoster] = useState([]);
  const [leagueTeams, setLeagueTeams] = useState(null);
  const [partner, setPartner] = useState(null);
  const [partnerOptions, setPartnerOptions] = useState(null);
  const [partnerRoster, setPartnerRoster] = useState([]);
  const [userCheckedState, setUserCheckedState] = useState([]);
  const [playersToSend, setPlayersToSend] = useState([]);
  const [partnerCheckedState, setPartnerCheckedState] = useState([]);
  const [playersToReceive, setPlayersToReceive] = useState([]);
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

  // const handleTeamChange = (e) => {
  //   let idx = e.target.selectedIndex
  //   let dataset = e.target.options[idx].dataset
  //   getRosterInfo(authToken, setAuthToken, params?.leagueKey, e.target.value, setPartnerRosterCb)
  //   setPartner((prevState) => ({
  //     ...prevState,
  //     team_key: e.target.value,
  //     team_name: dataset.name,
  //     managers: dataset.managers
  //   }))
  // }

  const handleUserPlayerSelect = (selectedIndex) => {
    let updatedUserCheckedState = userCheckedState.map((bool, stateIndex) => stateIndex === selectedIndex ? !bool : bool)
    setUserCheckedState(updatedUserCheckedState)
  }

  const handlePartnerPlayerSelect = (selectedIndex) => {
    let updatedPartnerCheckedState = partnerCheckedState.map((bool, stateIndex) => stateIndex === selectedIndex ? !bool : bool)
    setPartnerCheckedState(updatedPartnerCheckedState)
  }

  const handleSubmit = () => {
    let tradeDetails = {
      teamKey: partner?.value,
      teamName: partner?.label,
      players_to_send: playersToSend,
      players_to_receive: playersToReceive
    }
    createTrade(authToken, setAuthTokenCb, params?.leagueKey, tradeDetails)
    return navigate(-1)
  }

  useEffect(() => {
    getRosterInfo(authToken, setAuthTokenCb, params?.leagueKey, location.state.teamKey, setUserRosterCb)
    getLeagueTeams(authToken, setAuthTokenCb, params?.leagueKey, setLeagueTeamsCb)
  }, [])

  useEffect(() => {
    let teamOptions = []
    leagueTeams?.forEach(team => team?.team_key !== location.state.teamKey && teamOptions.push({ value: team?.team_key, label: team?.team_name }))
    setPartnerOptions(teamOptions)
  }, [leagueTeams])

  useEffect(() => {
    setUserCheckedState(new Array(userRoster?.length).fill(false))
  }, [userRoster])

  useEffect(() => {
    setPartnerCheckedState(new Array(partnerRoster?.length).fill(false))
  }, [partnerRoster])

  useEffect(() => {
    if (partner !== null) {
      getRosterInfo(authToken, setAuthTokenCb, params?.leagueKey, partner?.value, setPartnerRosterCb)
    }
  }, [partner])

  useEffect(() => {
    let playerKeys = []
    userCheckedState.forEach((bool, index) => bool && playerKeys.push({ player_key: userRoster[index].player_key, player_name: userRoster[index].player_name }))
    setPlayersToSend(playerKeys)
  }, [userCheckedState])

  useEffect(() => {
    let playerKeys = []
    partnerCheckedState.forEach((bool, index) => bool && playerKeys.push({ player_key: partnerRoster[index].player_key, player_name: partnerRoster[index].player_name }))
    setPlayersToReceive(playerKeys)
  }, [partnerCheckedState])



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
            userRoster?.map((player, index) =>
              <div key={player?.player_key}>
                <input
                  type="checkbox"
                  id="player_to_send"
                  name="player_to_send"
                  value={player?.player_key}
                  checked={userCheckedState[index] || false}
                  onChange={() => handleUserPlayerSelect(index)}
                />
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
      {userRoster ?
        <>
          <div>
            <label htmlFor="role">Choose a team to trade with:</label>
            {/* < select
              onChange={e => handleTeamChange(e)}
              className="browser-default custom-select" 
              defaultValue={partner?.team_name}
              >
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
          </select > */}

            < Select
              onChange={setPartner}
              options={partnerOptions}
              placeholder="Select Team"
              defaultValue=""
            >
            </Select >
          </div>
          {
            partnerRoster ?
              partnerRoster?.map((player, index) =>
                <div key={player?.player_key}>
                  <input
                    type="checkbox"
                    id="player_to_receive"
                    name="player_to_receive"
                    value={player?.player_key}
                    checked={partnerCheckedState[index] || false}
                    onChange={() => handlePartnerPlayerSelect(index)}
                  />
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
                  No partner team selected
                </p>
              </>
          }
        </>
        :
        null
      }
      <div>
        {userRoster && partnerRoster && (playersToSend?.length > 0) && (playersToReceive?.length > 0) && <button onClick={() => handleSubmit()}>Create Trade</button>}
      </div>
    </>
  );
};

export default NewTrade;
