import React from 'react';

const PlayerCard = ({player, index, cb, checkedArr}) => {
  return (
    <div className="flex no-wrap">
        <input
        type="checkbox"
        id={player?.player_key}
        name="player_to_send"
        value={player?.player_key}
        checked={checkedArr[index] || false}
        onChange={() => cb(index)}
        className="peer"
        hidden
        />
        <label htmlFor={player?.player_key} 
        className="flex flex-col md:w-full gap-x-4 shrink-0 no-wrap group peer-checked:border-emerald-500 border border-transparent peer-checked:bg-emerald-50 p-2 md:p-4 rounded-md"
        > 
            <div className="flex sticky left-0 gap-x-4 px-2">
            <img src={player?.player_image} className="w-6 md-w-16 md-h-16" />
            <div className="flex flex-col justify-center">
                <p className="text-xs">{player?.player_name}</p>
                <p className="text-xs text-slate-400">{player?.player_team_abbr} - {player?.player_positions}</p>
            </div>
            </div>
            <div className="flex flex-col justify-center">
            <div className="flex gap-x-4 mt-2">
                {Object.entries(player?.stats).map(([key,value],index) => 
                <div className="flex flex-col items-center" key={index}>
                    <p className="text-xs text-slate-400">{key}</p> 
                    <p className="text-xs flex">{value}</p>
                </div>
                )}
            </div>
            </div>
        </label>
    </div>
  );
};

export default PlayerCard;
