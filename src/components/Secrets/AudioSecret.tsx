import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import { SERVER_URL } from "constants";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import { ISecretComponentProps } from "~interfaces/index";
import Button from '@mui/material/Button';
import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";


export const AudioSecret: React.FC<ISecretComponentProps> = ({ id, title, availableAt, url, createdAt, countdownHandler }) => {
  const [isShown, setIsShown] = useState(false);
  const availableAtUserTZ = new Date(availableAt).toLocaleString();
  return (
    <Card sx={{ maxWidth: '30%' }}>
      <CardActionArea component={Link} to={`../secret/${id}`}>
        <CardHeader
          title={title}
          subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
          avatar={<Avatar>QS</Avatar>}
        // TODO: add action for user's secrets (change title and so on...)
        />
        <CardMedia image="/icons/audio.png" component='img' height={100} sx={{ objectFit: 'contain' }} />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et mollis sem. Etiam laoreet gravida ante. Pellentesque finibus nisl id nibh posuere, consequat feugiat mauris viverra. Pellentesque euismod sem a felis vehicula auctor. Donec at dui est. Fusce sit amet nibh aliquam, dictum magna vitae, varius lorem. Nulla facilisi.</Typography>
          <Typography>Available at: {availableAtUserTZ}</Typography>
          {url && <audio controls src={SERVER_URL + url} />}
          {!url && <><span>Will be available at: </span> <Countdown className="secret__countdown" date={availableAt} onComplete={countdownHandler} /></>}


        </CardContent>
      </CardActionArea>
      <CardMedia>
        <Collapse orientation="horizontal" in={isShown} timeout={100} collapsedSize={40} onMouseOver={() => setIsShown(true)} onMouseOut={()=>setIsShown(false)}>
          <Box height={40} sx={{backgroundColor: 'red'}}>
            <IconButton>
              <Share />
            </IconButton>
            <IconButton onClick={() => {
              FB.ui({
                method: 'share',
                href: 'https://youtube.com/',
              }, function (response) { console.log(response.error_code); });
            }}>
              <Facebook />
            </IconButton>
            <IconButton>
              <Twitter />
            </IconButton>
            <IconButton>
              <Instagram />
            </IconButton>
          </Box>
        </Collapse>
      </CardMedia>
    </Card>
  );
};
