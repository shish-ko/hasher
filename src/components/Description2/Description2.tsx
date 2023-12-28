import { Grid, Typography } from "@mui/material";
import React from "react";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import index1 from '../../assets/index1.png';
import index2 from '../../assets/index2.png';

export const Description2: React.FC = () => {
  return (
    <AppBlock>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={6} >
          <Typography>
            State of the art file care, Ready when you aren’t
          </Typography>
          <Typography>
            Imagine having storage reservoir with futuristic technology for your sensitive documents. Where time stands till you want it to move. SecureVault provides next generation file security at your command.
          </Typography>
        </Grid>
        <Grid item xs={6} borderRadius={7.5} sx={{background: `center / cover url(${index1})`, height: '480px'}} >         
        </Grid>
      </Grid>
    </AppBlock>
  );
};
