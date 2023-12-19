import { SERVER_URL } from "constants";
import React from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { ISecretComponentProps } from "~interfaces/index";


export const DocSecret: React.FC<ISecretComponentProps> = ({ id, title, availableAt, url, countdownHandler }) => {
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
      {!url && <><span>Will be available at: </span><Countdown className="secret__countdown" date={availableAt} onComplete={countdownHandler}/></>}
      <Link to={`../secret/${id}`} ><button>Go to the secret</button></Link>
    </div>
  );
};
