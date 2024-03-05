import { Avatar, Divider, Grid, List, ListItem, Paper, Stack, Tooltip, Typography, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { SecretSkeleton } from "~comps/UI_components/Sceletons/SecretSkeleton";
import { IFutureSecret, ISecret, SERVER, TSecretWithStats } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";
import { get_MOCK_USER_SECRETS } from "~utils/helpers";
import { AppToggleBtn } from "~comps/UI_components/Button";
import Today from "@mui/icons-material/Today";
import CommentOutlined from "@mui/icons-material/CommentOutlined";
import EventAvailable from "@mui/icons-material/EventAvailable";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Title from "@mui/icons-material/Title";
import Favorite from "@mui/icons-material/Favorite";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import { StatTypography } from "~comps/UI_components/AppTypography";
import { ShareBlock } from "~comps/UI_components/ShareBlock/ShareBlock";
import { Link } from "react-router-dom";
import { SecretMedia } from "~comps/Secrets/SecretMedia";
import { CSSProperties } from "react";
import { serverAPI } from "~utils/axios";
import { SERVER_URL } from "app_constants";

const SecretListItem = styled(ListItem)({
  alignItems: 'center',
  width: '100%'
});

const secretDataStyles: CSSProperties = {
  marginLeft: 50,
  wordWrap: 'break-word',
  textAlign: 'right',
  flexGrow: 1
};

export const Secret = () => {
  const { secretId } = useParams();
  let { res, refetch, setRes } = useServerFetch<TSecretWithStats<ISecret | IFutureSecret>>(SERVER.SECRET + secretId, {redirectOnError: '/'});
  if (import.meta.env.VITE_AUTH_FREE) {
    res = {...get_MOCK_USER_SECRETS().availableSecrets[0], stats: {isLiked: true, isSubscribed: false, likesNum: 122, subscribersNum: 11}, user: {id: 1, userPic: null, name: 'Anonymous'}};
  }

  if (res) {
    const { id, type, title, description, createdAt, availableAt, userId, views, url, 
      stats: {isLiked, isSubscribed, likesNum, subscribersNum}, 
      user: { userPic, name } 
    }  = res;

    const likeHandler = async () => {
      if (isLiked) {
        const { data } = await serverAPI.delete<TSecretWithStats<ISecret | IFutureSecret>>(SERVER.SECRET_LIKE + id);
        setRes(data);
      } else {
        const { data } = await serverAPI.post<TSecretWithStats<ISecret | IFutureSecret>>(SERVER.SECRET_LIKE + id);
        setRes(data);
      }
    };

    const subscriptionHandler = async () => {
      if (isSubscribed) {
        const { data } = await serverAPI.delete<TSecretWithStats<ISecret | IFutureSecret>>(SERVER.SECRET_SUBSCRIPTION + id);
        setRes(data);
      } else {
        const { data } = await serverAPI.post<TSecretWithStats<ISecret | IFutureSecret>>(SERVER.SECRET_SUBSCRIPTION + id);
        setRes(data);
      }
    };

    return (
      <AppBlock>
        <Paper elevation={14} component={Stack} gap={4} p={5}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' alignItems='center' gap={2} component={Link} to={`/user/${userId}`}>
              <Avatar src={SERVER_URL+userPic}>{name.slice(0,2)}</Avatar>
              <Typography>{name}</Typography>
            </Stack>
            <Stack direction='row' gap={2} sx={{ height: 'fit-content' }}>
              <Tooltip title={isSubscribed ? 'unsubscribe' : 'subscribe'} >
                <span>
                  <AppToggleBtn isActive={isSubscribed} inactiveIcon={<Add />} activeIcon={<Remove />} color="secondary" size="small" onClick={subscriptionHandler} />
                </span>
              </Tooltip>
              <Tooltip title={isLiked ? 'remove like' : 'like'} >
                <span>                  
                  <AppToggleBtn isActive={isLiked} inactiveIcon={<FavoriteBorder />} activeIcon={<Favorite />} color="secondary" size="small" onClick={likeHandler} />
                </span>
              </Tooltip>
            </Stack>
          </Stack>
          <SecretMedia url={url} type={type} availableAt={availableAt} countdownHandler={refetch} />
          <Stack alignItems='center' direction='row' justifyContent='space-between' px={4}>
            <List component={Stack} direction='row' disablePadding>
              <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
                <StatTypography>Views</StatTypography>
                <StatTypography>{views}</StatTypography>
              </ListItem>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
              <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
                <StatTypography>Likes</StatTypography>
                <StatTypography>{likesNum}</StatTypography>
              </ListItem>
              <Divider orientation="vertical" flexItem sx={{ margin: '0 20px' }} />
              <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
                <StatTypography>Subscribers</StatTypography>
                <StatTypography>{subscribersNum}</StatTypography>
              </ListItem>
            </List>
            <ShareBlock direction="left" />
          </Stack>
          <Grid container>
            <Grid item xs={8}>
              <List>
                <SecretListItem>
                  <Title fontSize="small" htmlColor="grey" />
                  <Typography ml={3}>Title</Typography>
                  <Typography sx={secretDataStyles}>{title}</Typography>
                </SecretListItem>
                <Divider variant="middle" />
                <SecretListItem>
                  <Today fontSize="small" htmlColor="grey" />
                  <Typography ml={3}>Created at</Typography>
                  <Typography sx={secretDataStyles}>{new Date(createdAt).toLocaleString()}</Typography>
                </SecretListItem>
                <Divider variant="middle" />
                {description &&
                  <>
                    <SecretListItem>
                      <EventAvailable fontSize="small" htmlColor="grey" />
                      <Typography ml={3}>Expired at</Typography>
                      <Typography sx={secretDataStyles}>{new Date(availableAt).toLocaleString()}</Typography>
                    </SecretListItem>
                    <Divider variant="middle" />
                    <SecretListItem>
                      <CommentOutlined fontSize="small" htmlColor="grey" />
                      <Typography ml={3}>Description</Typography>
                      <Typography sx={secretDataStyles}>{description}</Typography>
                    </SecretListItem>
                    <Divider variant="middle" />
                  </>
                }
              </List>
            </Grid>
          </Grid>
        </Paper>
      </AppBlock>
    );
  }

  return (
    <AppBlock>
      <Paper elevation={14} component={Stack} gap={4} p={5}>
        <SecretSkeleton />
      </Paper>
    </AppBlock>
  );
};
