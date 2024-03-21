import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ISecretWithUser } from "~interfaces/index";
import { AppAudioPlayer } from "~comps/Secrets/AudioSecret";
import { VideoSecret } from "./VideoSecret";
import { PhotoSecret } from "./PhotoSecret";
import { DocSecret } from "./DocSecret";
import { SERVER_URL } from "app_constants";
import { SecretSharingBlock } from "~comps/UI_components/ShareBlock/SecretSharingBlock";


export const AvailableSecret: React.FC<ISecretWithUser> = (secret) => {
  const { id, title, type, availableAt, url, createdAt, userId, description, user: {userPic, name} } = secret;
  const mediaRef = useRef<HTMLDivElement>(null);
  const availableAtUserTZ = new Date(availableAt).toLocaleString();

  return (
    <Card sx={{ flexBasis: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={4}>
      <CardHeader
        title={title}
        titleTypographyProps={{color:'text.secondary'}}
        subheaderTypographyProps={{color: 'text.primary'}}
        subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
        avatar={<Avatar component={RouterLink} to={`../user/${userId}`} src={SERVER_URL + userPic}>{name.slice(0, 2)}</Avatar>}
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
        <SecretSharingBlock {...secret} />
      </CardActions>
    </Card>
  );
};
