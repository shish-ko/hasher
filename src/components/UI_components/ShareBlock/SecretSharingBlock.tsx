import { Facebook, Instagram, Share, Twitter } from "@mui/icons-material";
import { Box, Collapse, IconButton } from "@mui/material";
import { APP_URL_ORIGIN } from "app_constants";
import { useState } from "react";
import { IFutureSecret, ISecret } from "~interfaces/index";
import { getSecretExpiredAnnotation } from "~utils/helpers";

export const SecretSharingBlock: React.FC<IFutureSecret | ISecret> = (secret) => {
  const [isShown, setIsShown] = useState(false);
  
  return (
    <Collapse orientation="horizontal" in={isShown} timeout={100} collapsedSize={40} onMouseOver={() => setIsShown(true)} onMouseOut={() => setIsShown(false)}>
      <Box height={40}>
        <IconButton>
          <Share />
        </IconButton>
        <IconButton onClick={() => {
          FB.ui({
            method: 'share',
            href: `https://secret-service.onrender.com/secret/${secret.id}`,
          }, function (response) { console.log(response.error_code); });
        }}>
          <Facebook />
        </IconButton>
        <IconButton href={`https://twitter.com/intent/tweet?url=${APP_URL_ORIGIN}/secret/${secret.id}&text=${getSecretExpiredAnnotation(secret, '%2b')}`}>
          <Twitter />
        </IconButton>
        <IconButton>
          <Instagram />
        </IconButton>
      </Box>
    </Collapse>
  );
};
