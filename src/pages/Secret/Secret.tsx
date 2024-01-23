import { Add, CommentOutlined, EventAvailable, FavoriteBorder, Remove, Share, Title, Today } from "@mui/icons-material";
import Download from "@mui/icons-material/Download";
import { Avatar, Box, Button, ButtonGroup, Divider, Grid, List, ListItem, Paper, Stack, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { AvailableSecret } from "~comps/Secrets/AvailableSecret";
import { PhotoSecret_L } from "~comps/Secrets/PhotoSecret_L";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { AppToggleBtn } from "~comps/UI_components/Button";
import { IFutureSecret, ISecret, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";


const StatTypography = styled(Typography)(() => ({
  fontSize: '1rem',
  color: grey[500],
}));

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

export const Secret = () => {
  const { secretId } = useParams();
  // let { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId, '/');
  let { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId);
  if (import.meta.env.VITE_AUTH_FREE) {
    res = undefined;
  }
  const isAvailableSecret = res && ('url' in res) && ('description' in res);
  return (
    <AppBlock>
      <Paper elevation={14} component={Stack} gap={4} p={5}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack direction='row' alignItems='center' gap={2} component={Link} to={'#'}>
            <Avatar>Avatr</Avatar>
            <Typography>Name</Typography>
          </Stack>
          <Stack direction='row' gap={2} sx={{height: 'fit-content'}}>
            <AppToggleBtn isActive={false} inactiveIcon={<Add />} activeIcon={<Remove />} color="secondary" size="small"></AppToggleBtn>
            <Button variant="outlined" size="small" sx={{borderColor: (t)=> t.palette.grey[300]}}  color="secondary"><FavoriteBorder /></Button>
            <Button color="success" size="small" endIcon={<Download />} variant="outlined" >Download</Button>
          </Stack>
        </Stack>
        <Box>
          <PhotoSecret_L url='https://content.onliner.by/news/1400x5616/1912a1a9d92cb927b85360d9440d05f2.jpg' />
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
                <Typography sx={secretDataStyles}>ppeeeeeeeeeeeeeeeeeeee p</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={secretInfoStyles}>
                <Today fontSize="small" htmlColor="grey"/>
                <Typography ml={3}>Created at</Typography>
                <Typography sx={secretDataStyles}>01.01.2020</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={secretInfoStyles}>
                <EventAvailable fontSize="small" htmlColor="grey"/>
                <Typography ml={3}>Expired at</Typography>
                <Typography sx={secretDataStyles}>01.01.2021</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={secretInfoStyles}>
                <CommentOutlined fontSize="small" htmlColor="grey"/>
                <Typography ml={3}>Description</Typography>
                <Typography sx={secretDataStyles}>ppeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeep</Typography>
              </ListItem>
              <Divider variant="middle" />
            </List>

          </Grid>
        </Grid>
      </Paper>
      {
        res ?
          isAvailableSecret ? <AvailableSecret {...res} /> : <></>
          :
          <></>
      }
    </AppBlock>
  );
};
