import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import { Avatar, Box, Button, Divider, Grid, List, ListItem, Stack, Typography, styled } from "@mui/material";
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
import { grey } from "@mui/material/colors";
import { CSSProperties } from "react";

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

export const AvailableSecret_L: React.FC = () => {
  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' alignItems='center' gap={2} component={Link} to={'#'}>
          <Avatar>Avatr</Avatar>
          <Typography>Name</Typography>
        </Stack>
        <Stack direction='row' gap={2} sx={{ height: 'fit-content' }}>
          <AppToggleBtn isActive={false} inactiveIcon={<Add />} activeIcon={<Remove />} color="secondary" size="small"></AppToggleBtn>
          <AppToggleBtn isActive={true} inactiveIcon={<FavoriteBorder />} activeIcon={<Favorite />} color="secondary" size="small"></AppToggleBtn>
          <Button color="success" size="small" endIcon={<Download />} variant="contained">Download</Button>
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
              <Today fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Created at</Typography>
              <Typography sx={secretDataStyles}>01.01.2020</Typography>
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={secretInfoStyles}>
              <EventAvailable fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Expired at</Typography>
              <Typography sx={secretDataStyles}>01.01.2021</Typography>
            </ListItem>
            <Divider variant="middle" />
            <ListItem sx={secretInfoStyles}>
              <CommentOutlined fontSize="small" htmlColor="grey" />
              <Typography ml={3}>Description</Typography>
              <Typography sx={secretDataStyles}>ppeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeep</Typography>
            </ListItem>
            <Divider variant="middle" />
          </List>

        </Grid>
      </Grid>
    </>
  );
};
