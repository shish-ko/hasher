import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";
import { Box, Collapse, IconButton } from "@mui/material";
import { APP_URL_ORIGIN } from "app_constants";
import { useState } from "react";
import { IFutureSecret, ISecret, SERVER } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { getSecretExpiredAnnotation } from "~utils/helpers";

export const SecretSharingBlock: React.FC<IFutureSecret | ISecret> = (secret) => {
  const [isShown, setIsShown] = useState(false);
  const fbClickHandler = () => {
    const shareSecret = () => {
      FB.ui({
        method: 'share',
        href: `https://secret-service.onrender.com/secret/${secret.id}`,
      });
    };

    if (secret.url && !secret.isRescrapedByFB) {
      FB.api('https://graph.facebook.com/', 'post', {
        id: `https://secret-service.onrender.com/secret/${secret.id}`,
        access_token: `${import.meta.env.VITE_FB_APP_ID}|528740f08722105d1943de5c1554d0ae`,
        scrape: true
      }, (res) => { console.log(res); shareSecret(); serverAPI.patch(SERVER.SECRET + secret.id + SERVER.RESCRAPED);});
    } else {
      shareSecret();
    }
  };

  return (
    <Collapse orientation="horizontal" in={isShown} timeout={100} collapsedSize={40} onMouseOver={() => setIsShown(true)} onMouseOut={() => setIsShown(false)}>
      <Box height={40}>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton onClick={fbClickHandler}>
          <Facebook />
        </IconButton>
        <IconButton href={`https://twitter.com/intent/tweet?url=${APP_URL_ORIGIN}/secret/${secret.id}&text=${getSecretExpiredAnnotation(secret)}`}>
          <Twitter />
        </IconButton>
        <IconButton>
          <Instagram />
        </IconButton>
      </Box>
    </Collapse>
  );
};
