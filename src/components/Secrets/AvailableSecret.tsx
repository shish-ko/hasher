import { Avatar, Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ISecret } from "~interfaces/index";
import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";
import { AppAudioPlayer } from "~comps/Secrets/AudioSecret";
import { VideoSecret } from "./VideoSecret";
import { PhotoSecret } from "./PhotoSecret";
import { DocSecret } from "./DocSecret";


export const AvailableSecret: React.FC<ISecret> = ({ id, title, type, availableAt, url, createdAt, userId, description }) => {
  const [isShown, setIsShown] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const availableAtUserTZ = new Date(availableAt).toLocaleString();

  return (
    <Card sx={{ flexBasis: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={4}>
      <CardHeader
        title={title}
        titleTypographyProps={{color:'text.secondary'}}
        subheaderTypographyProps={{color: 'text.primary'}}
        subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
        avatar={<Avatar component={RouterLink} to={`../user/${userId}`}>QS</Avatar>} // TODO add usrName instead of QS
      // TODO: add action for user's secrets (change title and so on...)
      />
      <CardMedia ref={mediaRef} component='div' sx={{ position: 'relative' }}>
        {
          (function () {
            switch (type) {
              case 'AUDIO':
                return <AppAudioPlayer url={url} />;
              case 'VIDEO':
                return <VideoSecret url={url} />;
              case 'PHOTO':
                return <PhotoSecret url={url} />;
              default:
                return <DocSecret url={url} />;
            }
          })()
        }
      </CardMedia>
      <CardActionArea component={RouterLink} to={`../secret/${id}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Typography sx={{ color: 'text.secondary', textAlign: 'justify', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: 'hidden' }}>{description}</Typography>
          <Typography>Available at: {availableAtUserTZ}</Typography>
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
