import { SERVER_URL } from "constants";
import React from "react";
import { ISecret } from "~interfaces/index";


export const DocSecret: React.FC<ISecret> = ({ title, availableAt, url }) => {
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return (
    <div className="secret"> 
      {url ?
        <a href={SERVER_URL+url} download={true}>Download file</a> :
        <img src="/icons/photo.png" className="secret__icon"/> 
      }
      <span>Title</span>
      <h3>{title}</h3>
      <span>Available at</span>
      <div>{availableAtUserTZ}</div>
    </div>
  );
};
