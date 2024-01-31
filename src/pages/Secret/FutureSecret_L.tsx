import { Avatar, Box, Divider, Grid, List, ListItem, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AppToggleBtn } from "~comps/UI_components/Button";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { StatTypography } from "~comps/UI_components/AppTypography";
import Share from "@mui/icons-material/Share";
import Title from "@mui/icons-material/Title";
import Today from "@mui/icons-material/Today";
import { CSSProperties } from "react";
import { IFutureSecret, ISecret, ISecretRes } from "~interfaces/index";
import { COLORS } from "style/colors";
import Countdown from "react-countdown";
import { countdownRenderer } from "~utils/helpers";
import { ShareBlock } from "~comps/UI_components/ShareBlock/ShareBlock";

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
type IFutureSecretProps = ISecretRes<ISecret> & {
  setSecret: React.Dispatch<React.SetStateAction<ISecretRes<ISecret | IFutureSecret> | undefined>>;
  countdownHandler: () => void 
}

export const FutureSecret_L: React.FC<IFutureSecretProps> =({secret: {title, type, userId, availableAt, createdAt}, interaction: {isLiked}, countdownHandler, setSecret}  ) => {
  return (
    <>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack direction='row' alignItems='center' gap={2} component={Link} to={`/user/${userId}`}>
          <Avatar>Avatr</Avatar>
          <Typography>Name</Typography>
        </Stack>
        <Stack direction='row' gap={2} sx={{ height: 'fit-content' }}>
          <AppToggleBtn isActive={false} inactiveIcon={<Add />} activeIcon={<Remove />} color="secondary" size="small"></AppToggleBtn>
          <AppToggleBtn isActive={true} inactiveIcon={<FavoriteBorder />} activeIcon={<Favorite />} color="secondary" size="small"></AppToggleBtn>
        </Stack>
      </Stack>
      <Box sx={{backgroundColor: 'black', padding: '40px  0'}}>
      <Typography textAlign='center' mb={5} color={COLORS.lightText}>
            <Typography component='span' textTransform='capitalize' >{type} </Typography>
            will be available in:
          </Typography>
          <Countdown  zeroPadTime={2} intervalDelay={80} precision={2} date={availableAt} onComplete={countdownHandler} renderer={countdownRenderer({fontSize: '10rem'})}/>
        
      </Box>
      <Stack alignItems='center' direction='row' justifyContent='space-between' px={4}>
        <List component={Stack} direction='row' disablePadding>
          <ListItem sx={{ flexDirection: 'column', alignItems: 'center' }} disablePadding>
            <StatTypography>Views</StatTypography>
            <StatTypography>1,000</StatTypography>
          </ListItem>
        </List>
        {/* <Share /> */}
        <ShareBlock direction="left"/>
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
          </List>
        </Grid>
      </Grid>
    </>
  );
};
