import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import { Avatar, Box, Button, Divider, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { AppToggleBtn } from "~comps/UI_components/Button";
import { Link } from "react-router-dom";
import Today from "@mui/icons-material/Today";
import CommentOutlined from "@mui/icons-material/CommentOutlined";
import EventAvailable from "@mui/icons-material/EventAvailable";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Share from "@mui/icons-material/Share";
import Title from "@mui/icons-material/Title";
import Favorite from "@mui/icons-material/Favorite";
import Download from "@mui/icons-material/Download";
import { PhotoSecret_L } from "~comps/Secrets/PhotoSecret_L";
import { CSSProperties, useRef } from "react";
import { StatTypography } from "~comps/UI_components/AppTypography";
import { AppAudioPlayer } from "~comps/Secrets/AudioSecret";
import { VideoSecret } from "~comps/Secrets/VideoSecret";
import { DocSecret } from "~comps/Secrets/DocSecret";
import { ISecret } from "~interfaces/index";

const secretInfoStyles: CSSProperties = {
  alignItems: 'center',
  width: '100%'
};

const secretDataStyles: CSSProperties = {
  marginLeft: 50,
  wordWrap: 'break-word',
  textAlign: 'right',
  flexGrow: 1
};

export const AvailableSecret_L: React.FC<ISecret> = ({url, type, title, description, createdAt, availableAt, userId}) => {
  const mediaRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' alignItems='center' gap={2} component={Link} to={`/user/${userId}`}>
          <Avatar>Avatr</Avatar>
          <Typography>Name</Typography>
        </Stack>
        <Stack direction='row' gap={2} sx={{ height: 'fit-content' }}>
          <AppToggleBtn isActive={false} inactiveIcon={<Add />} activeIcon={<Remove />} color="secondary" size="small"></AppToggleBtn>
          <AppToggleBtn isActive={false} inactiveIcon={<FavoriteBorder />} activeIcon={<Favorite />} color="secondary" size="small"></AppToggleBtn>
          {/* <Button color="success" size="small" endIcon={<Download />} variant="contained">Download</Button> */}
        </Stack>
      </Stack>
      <Box ref={mediaRef} sx={{ position: 'relative' }}>
        {
          (function () {
            switch (type) {
              case 'AUDIO':
                return <AppAudioPlayer url={url} />;
              case 'VIDEO':
                return <VideoSecret url={url} />;
              case 'PHOTO':
                return <PhotoSecret_L url={url} />;
              default:
                return <DocSecret url={url} />;
            }
          })()
        }        
      </Box>
      <Stack alignItems='center' direction='row' justifyContent='space-between' px={4}>
        <List component={Stack} direction='row' disablePadding>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
            <StatTypography>Views</StatTypography>
            <StatTypography>1,000</StatTypography>
          </ListItem>
          <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
          <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
            <StatTypography>Likes</StatTypography>
            <StatTypography>1,000</StatTypography>
          </ListItem>
          <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
          <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
            <StatTypography>Downloads</StatTypography>
            <StatTypography>1,000</StatTypography>
          </ListItem>
        </List>
        <Share />
      </Stack>
      <Grid container>
        <Grid item xs={8}>
          <List>
            <ListItem sx={secretInfoStyles}>
              <Title fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Title</Typography>
              <Typography sx={secretDataStyles}>{title}</Typography>
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={secretInfoStyles}>
              <Today fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Created at</Typography>
              <Typography sx={secretDataStyles}>{new Date(createdAt).toLocaleString()}</Typography>
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={secretInfoStyles}>
              <EventAvailable fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Expired at</Typography>
              <Typography sx={secretDataStyles}>{new Date(availableAt).toLocaleString()}</Typography>
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={secretInfoStyles}>
              <CommentOutlined fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Description</Typography>
              <Typography sx={secretDataStyles}>{description}</Typography>
            </ListItem>
            <Divider variant="middle" />
          </List>
        </Grid>
      </Grid>
    </>
  );
};