import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";
import { Avatar, Box, Card, CardActionArea, CardActions, CardHeader, CardMedia, CardProps, Collapse, IconButton, Typography, styled } from "@mui/material";
import { useState } from "react";
import Countdown from "react-countdown";
import { Link as RouterLink } from 'react-router-dom';
import { COLORS } from "style/colors";
import { IFutureSecret } from "~interfaces/index";
import { countdownRenderer } from "~utils/helpers";

type IFutureSecretProps = IFutureSecret & { countdownHandler: () => void } & CardProps

const Secret_future = styled(Card)(()=>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const FutureSecret: React.FC<IFutureSecretProps> = ({ id, type, availableAt, createdAt, title, countdownHandler, ...rest }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <Secret_future elevation={4} {...rest}>
      <CardHeader
        title={title}
        subheader={`Created at: ${new Date(createdAt).toLocaleDateString()}`}
        titleTypographyProps={{color:'text.secondary'}}
        subheaderTypographyProps={{color: 'text.primary'}}
        avatar={<Avatar component={RouterLink} to={`../user/${id}`}>QS</Avatar>} // TODO add usrName instead of QS
      // TODO: add action for user's secrets (change title and so on...)
      />
      <CardActionArea component={RouterLink} to={`../secret/${id}`}>
        <CardMedia sx={{height: '200px', backgroundColor: 'black', padding: '30px 0'}}>
          <Typography textAlign='center' mb={5} color={COLORS.lightText}>
            <Typography component='span' textTransform='capitalize' >{type} </Typography>
            will be available in:
          </Typography>
          <Countdown  zeroPadTime={2} intervalDelay={80} precision={2} date={availableAt} onComplete={countdownHandler} renderer={countdownRenderer}/>
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
