import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Countdown from "react-countdown";
import { Link as RouterLink } from "react-router-dom";
import { ISecretComponentProps } from "~interfaces/index";
import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";
import { AppAudioPlayer } from "~comps/UI_components/Players/AudioPlayer";


export const AudioSecret: React.FC<Required<ISecretComponentProps>> = ({ id, title, availableAt, url, createdAt, countdownHandler }) => {
  const [isShown, setIsShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const availableAtUserTZ = new Date(availableAt).toLocaleString();

  return (
    <Card sx={{ maxWidth: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={4}>
        <CardHeader
          title={title}
          subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
          avatar={<Avatar component={RouterLink} to={`../user/${id}`}>QS</Avatar>} // TODO add usrName instead of QS
        // TODO: add action for user's secrets (change title and so on...)
        />
        <CardMedia ref={ref} component='div' sx={{position: 'relative'}}>
          <AppAudioPlayer renderTo={ref} url={url}/>
        </CardMedia>
      <CardActionArea component={RouterLink} to={`../secret/${id}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography sx={{ textAlign: 'justify', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: 'hidden' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et mollis sem. Etiam laoreet gravida ante. Pellentesque finibus nisl id nibh posuere, consequat feugiat mauris viverra. Pellentesque euismod sem a felis vehicula auctor. Donec at dui est. Fusce sit amet nibh aliquam, dictum magna vitae, varius lorem. Nulla facilisi.</Typography>
          <Typography color='black'>Available at: {availableAtUserTZ}</Typography>                 
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Collapse orientation="horizontal" in={isShown} timeout={100} collapsedSize={40} onMouseOver={() => setIsShown(true)} onMouseOut={() => setIsShown(false)}>
          <Box height={40}>
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
      </CardActions>
    </Card>
  );
};
