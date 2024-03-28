import { Avatar, Card, CardActionArea, CardActions, CardHeader, CardMedia, SxProps, Typography, styled } from "@mui/material";
import { SERVER_URL } from "app_constants";
import Countdown from "react-countdown";
import { Link as RouterLink } from 'react-router-dom';
import { COLORS } from "style/colors";
import { SecretSharingBlock } from "~comps/UI_components/ShareBlock/SecretSharingBlock";
import { IFutureSecretWithUser } from "~interfaces/index";
import { countdownRenderer } from "~utils/helpers";

type IFutureSecretProps =  {
  secret: IFutureSecretWithUser;
  countdownHandler: () => void;
  sx: SxProps
}

const Secret_future = styled(Card)(()=>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const FutureSecret: React.FC<IFutureSecretProps> = ({secret, countdownHandler, sx}) => {
  const  {id, type, userId, availableAt, createdAt, title, user: {userPic, name} } = secret;
  return (
    <Secret_future elevation={4} sx={sx}>
      <CardHeader
        title={title}
        subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
        titleTypographyProps={{color:'text.secondary'}}
        subheaderTypographyProps={{color: 'text.primary'}}
        avatar={<Avatar component={RouterLink} to={`../user/${userId}`} src={SERVER_URL+userPic}>{name}</Avatar>} // TODO add usrName instead of QS
      // TODO: add action for user's secrets (change title and so on...)
      />
      <CardActionArea component={RouterLink} to={`../secret/${id}`}>
        <CardMedia sx={{height: '200px', backgroundColor: 'black', padding: '30px 0'}}>
          <Typography textAlign='center' mb={5} color={COLORS.lightText}>
            <Typography component='span' textTransform='capitalize' >{type} </Typography>
            will be available in:
          </Typography>
          <Countdown  zeroPadTime={2} intervalDelay={80} precision={3} date={availableAt} onComplete={countdownHandler} renderer={countdownRenderer({fontSize: '4rem'})}/>
        </CardMedia>
      </CardActionArea>
      <CardActions>
        <SecretSharingBlock {...secret}/>
      </CardActions>
    </Secret_future>
  );
};
