import { SERVER_URL } from "constants";
import React from "react";
import Countdown from "react-countdown";
import { ISecretComponentProps } from "~interfaces/index";


export const AudioSecret: React.FC<ISecretComponentProps> = ({ title, availableAt, url, countdownHandler }) => {
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return (
    <div className="secret"> 
      <img src="/icons/audio.png" className="secret__icon"/>
      <span>Title</span>
      <h3>{title}</h3>
      <span>Available at</span>
      <div>{availableAtUserTZ}</div>
      {url && <audio controls src={SERVER_URL + url}/>}
      {!url && <><span>Will be available at: </span> <Countdown className="secret__countdown" date={availableAt} onComplete={countdownHandler}/></>}
    </div>
  );
};
