import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";
import { Avatar, Box, Card, CardActionArea, CardActions, CardHeader, CardMedia, CardProps, Collapse, IconButton, Typography, TypographyProps, styled } from "@mui/material";
import { CSSProperties, useState } from "react";
import Countdown, { CountdownTimeDelta } from "react-countdown";
import { Link as RouterLink } from 'react-router-dom';
import { IFutureSecret } from "~interfaces/index";

type IFutureSecretProps = IFutureSecret & { countdownHandler: () => void } & CardProps

interface ITypographyCountdownProps extends TypographyProps {
  milliseconds? :boolean
}
const TypographyCountdown = styled(Typography)<ITypographyCountdownProps>(({theme, milliseconds})=>{
  const res: CSSProperties = {
    fontFamily: "AlarmClock",
    fontSize: '4rem',
    textAlign: 'center',
    display: 'block'
  };
  if(milliseconds){
    return {
      color: theme.palette.error.main,
      ...res,
    };
  } else{
    return {
      color: theme.palette.warning.main,
      ...res,
    };
  }
});

const Secret_future = styled(Card)(()=>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const renderer = ({ hours, minutes, seconds, milliseconds, completed }: CountdownTimeDelta) => {
  if(completed) return <TypographyCountdown milliseconds={true}>--:--:---</TypographyCountdown>;
  if (hours) {
    return <TypographyCountdown>{hours}:{minutes}:{seconds.toString().padStart(2, '0')}</TypographyCountdown>;
  } 
  return <TypographyCountdown  milliseconds={true}>{minutes}:{seconds}:{milliseconds.toString().padStart(3, '0')}</TypographyCountdown >;
};

export const FutureSecret: React.FC<IFutureSecretProps> = ({ id, type, availableAt, createdAt, title, countdownHandler, ...rest }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Secret_future elevation={4} {...rest}  {...rest}>
      <CardHeader
        title={title}
        subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
        avatar={<Avatar component={RouterLink} to={`../user/${id}`}>QS</Avatar>} // TODO add usrName instead of QS
      // TODO: add action for user's secrets (change title and so on...)
      />
      <CardActionArea component={RouterLink} to={`../secret/${id}`}>
        <CardMedia sx={{height: '200px', backgroundColor: 'black', padding: '30px 0'}}>
          <Typography textAlign='center' mb={5}>
            <Typography component='span' textTransform='capitalize'>{type} </Typography>
            will be available in:
          </Typography>
          <Countdown zeroPadTime={2} intervalDelay={50} precision={3} date={availableAt} onComplete={countdownHandler} renderer={renderer}/>
        </CardMedia>
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
    </Secret_future>
  );
};
