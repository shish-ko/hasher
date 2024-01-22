import { Share, Title } from "@mui/icons-material";
import { Avatar, Box, Button, ButtonGroup, Divider, Grid, List, ListItem, Paper, Stack, Typography, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { AvailableSecret } from "~comps/Secrets/AvailableSecret";
import { PhotoSecret_L } from "~comps/Secrets/PhotoSecret_L";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { IFutureSecret, ISecret, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";

const statStyle: CSSProperties = {
  fontSize: '1rem',
  color: grey[600],
};
const StatTypography = styled(Typography)(() => ({
  fontSize: '1rem',
  color: grey[500],
}));

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
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' gap={2} component={Link} to={'#'}>
            <Avatar>Avatr</Avatar>
            <Typography>Name</Typography>
          </Stack>
          <ButtonGroup>
            <Button>qwe</Button>
            <Button>qwe</Button>
            <Button>qwe</Button>
          </ButtonGroup>
        </Stack>
        <Box>
          <PhotoSecret_L url='https://content.onliner.by/news/1400x5616/1912a1a9d92cb927b85360d9440d05f2.jpg' />
        </Box>
        <Stack alignItems='center' direction='row' justifyContent='space-between' px={4}>
          <List component={Stack} direction='row' disablePadding>
            <ListItem sx={{flexDirection: 'column', alignItems: 'center'}} disablePadding>
              <StatTypography>Views</StatTypography>
              <StatTypography>1,000</StatTypography>
            </ListItem>
            <Divider orientation="vertical" flexItem sx={{margin: '0 20px'}}/>
            <ListItem sx={{flexDirection: 'column', alignItems: 'center'}} disablePadding>
              <StatTypography>Likes</StatTypography>
              <StatTypography>1,000</StatTypography>
            </ListItem>
            <Divider orientation="vertical" flexItem sx={{margin: '0 20px'}}/>
            <ListItem sx={{flexDirection: 'column', alignItems: 'center'}} disablePadding>
              <StatTypography>Downloads</StatTypography>
              <StatTypography>1,000</StatTypography>
            </ListItem>
          </List>
          <Share />
        </Stack>
        <Grid container>
          <Grid item xs={8}>
            <List>
              <ListItem sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <Title fontSize="small"/>
                  <Typography> Title</Typography>
                  <Typography sx={{ maxWidth: '65%', wordWrap: 'break-word', textAlign: 'right' }}>ppeeeeeeeeeeeeeeeeeeee p</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <Typography>Created at</Typography>
                  <Typography sx={{ maxWidth: '65%'}}>01.01.2020</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <Typography>Expired at</Typography>
                  <Typography sx={{ maxWidth: '65%' }}>01.01.2021</Typography>
              </ListItem>
              <Divider variant="middle" />
              <ListItem sx={{justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                  <Typography>Description</Typography>
                  <Typography sx={{ maxWidth: '65%', wordWrap: 'break-word', textAlign: 'right' }}>ppeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeep</Typography>
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
