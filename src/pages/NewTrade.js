import { useContext, useState, useEffect } from 'react'
import { SessionContext } from '../contexts/SessionContext';
import { Navigate, useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { getRosterInfo } from '../utils/Utils';
import { getLeagueTeams } from '../utils/Utils';
import { createTrade } from '../utils/Utils';
import Select from 'react-select';
import PlayerCard from '../parts/PlayerCard';
import StickyButton from '../parts/StickyButton';

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
    leagueTeams.forEach(team => {(team?.team_key == partner?.value) && (tradeDetails.team_logo = team?.team_logo_url)})
    createTrade(authToken, setAuthTokenCb, params?.leagueKey, tradeDetails).then(tradeId => {
      navigate(`/trade/${tradeId}`)
    }).catch(error => {
      navigate(`/trades/${params?.leagueKey}`)
    })


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
    <div className="flex flex-col px-4 max-w-screen-xl m-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="pt-4">
          <p>{location.state?.leagueName}</p>
        </div>
        <div className="pt-4"> 
          {userRoster.length > 0 && <Select
            onChange={setPartner}
            options={partnerOptions}
            placeholder="Select Team"
            defaultValue=""
          >
          </Select>}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-col gap-y-4 overflow-x-auto md:w-[46%] md:pr-4">
          <h2 className="text-4xl sticky top-0 left-0 pt-8">{location.state?.teamName}</h2>
            {userRoster.length > 0 ?
                userRoster?.map((player, index) =>
                <PlayerCard 
                  key={index}
                  player={player}
                  type="send" 
                  index={index} 
                  cb={handleUserPlayerSelect} 
                  checkedArr={userCheckedState} 
                />
                )
                :
                  <p>
                    This league is currently inactive
                  </p>
            }
        </div>
          {userRoster &&
            <div className="flex flex-col gap-y-4 overflow-x-auto mt-8 border-t border-slate-400 md:mt-0 md:w-[46%] md:border-t-0 md:border-l md:pl-4">
              {partner && <h2 className="text-4xl sticky top-0 left-0 pt-8 md:mt-0">{partner?.label}</h2>}
              {partnerRoster &&
                  partnerRoster?.map((player, index) =>
                  <PlayerCard 
                    key={index}
                    player={player} 
                    type="receive"
                    index={index} 
                    cb={handlePartnerPlayerSelect} 
                    checkedArr={partnerCheckedState} 
                  />
                  )
              }
            </div>
          }
      </div>
      <StickyButton 
        cb={handleSubmit}
        classnames={ (userRoster && partnerRoster && (playersToSend?.length > 0) && (playersToReceive?.length > 0)) ? "bg-emerald-500 text-white" : "bg-slate-200 text-black" }
        disabled={ (userRoster && partnerRoster && (playersToSend?.length > 0) && (playersToReceive?.length > 0)) ? false: true}
        >Create Trade
      </StickyButton>
    </div>
  );
};

export default NewTrade;
