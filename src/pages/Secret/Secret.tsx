import { Avatar, Divider, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { SecretSkeleton } from "~comps/UI_components/Sceletons/SecretSkeleton";
import { IFutureSecret, ISecret, ISecretRes, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";
import { AvailableSecret_L } from "./AvailableSecret_L";
import { get_MOCK_USER_SECRETS } from "~utils/helpers";
import { FutureSecret_L } from "./FutureSecret_L";
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

export const Secret = () => {
  const { secretId } = useParams();
  // let { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId, '/');
  let { res, refetch, setRes } = useServerFetch<ISecretRes<ISecret | IFutureSecret>>(SERVER.SECRET + secretId);
  if (import.meta.env.VITE_AUTH_FREE) {
    res = {
      secret: get_MOCK_USER_SECRETS().futureSecrets[0],
      interaction: { isLiked: true, subscription: false }
    };
  }
  const isAvailableSecret = res?.secret && ('url' in res.secret) && ('description' in res.secret);
  return (
    <AppBlock>
      <Paper elevation={14} component={Stack} gap={4} p={5}>
        {!res ?
          <SecretSkeleton /> :
          <>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Stack direction='row' alignItems='center' gap={2} component={Link} to={`/user/${userId}`}>
                <Avatar>Avatr</Avatar>
                <Typography>Name</Typography>
              </Stack>
              <Stack direction='row' gap={2} sx={{ height: 'fit-content' }}>
                <AppToggleBtn isActive={subscription} inactiveIcon={<Add />} activeIcon={<Remove />} color="secondary" size="small" onClick={subscriptionHandler} />
                <AppToggleBtn isActive={isLiked} inactiveIcon={<FavoriteBorder />} activeIcon={<Favorite />} color="secondary" size="small" onClick={likeHandler} />
              </Stack>
            </Stack>
            <SecretMedia url={url} type={type} availableAt={availableAt} countdownHandler={ } />
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
              {/* <Share /> */}
              <ShareBlock direction="left" />
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
        }
      </Paper>
    </AppBlock>
  );
};
