import { Avatar, Card, CardHeader, CardMedia } from "@mui/material";
import { SERVER_URL } from "constants";
import React from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { ISecretComponentProps } from "~interfaces/index";


export const AudioSecret: React.FC<ISecretComponentProps> = ({ id, title, availableAt, url, createdAt, countdownHandler }) => {
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return (
    <Card> 
      <CardHeader 
        title={title}
        subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
        avatar={<Avatar>QS</Avatar>}
        // TODO: add action for user's secrets (change title and so on...)
      />
      <CardMedia image="/icons/audio.png" component='img' height={100} sx={{objectFit: 'contain'}}/>
      {/* <img src="/icons/audio.png" className="secret__icon"/> */}
      <span>Title</span>
      <h3>{title}</h3>
      <span>Available at</span>
      <div>{availableAtUserTZ}</div>
      {url && <audio controls src={SERVER_URL + url}/>}
      {!url && <><span>Will be available at: </span> <Countdown className="secret__countdown" date={availableAt} onComplete={countdownHandler}/></>}
      <Link to={`../secret/${id}`} ><button>Go to the secret</button></Link>
    </Card>
  );
};
