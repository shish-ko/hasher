import { SERVER_URL } from "constants";
import React from "react";
import Countdown from "react-countdown";
import { ISecret } from "~interfaces/index";


export const DocSecret: React.FC<ISecret> = ({ title, availableAt, url, countdownHandler }) => {
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return (
    <div className="secret"> 
      {url ?
        <a href={SERVER_URL+url} download={true}>Download file</a> :
        <img src="/icons/doc.png" className="secret__icon"/> 
      }
      <span>Title</span>
      <h3>{title}</h3>
      <span>Available at</span>
      <div>{availableAtUserTZ}</div>
      {!url && <><span>Will be available at: </span><Countdown date={availableAt} onComplete={countdownHandler}/></>}
    </div>
  );
};
