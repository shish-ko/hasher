import { SERVER_URL } from "constants";
import React from "react";
import { ISecret } from "~interfaces/index";


export const AudioSecret: React.FC<ISecret> = ({ title, availableAt, url }) => {
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return (
    <div className="secret"> 
      <img src="/icons/audio.png"/>
      <h3>{title}</h3>
      <div>{availableAtUserTZ}</div>
      {url && <audio controls src={SERVER_URL + 'public/' + url}/>}
    </div>
  );
};
