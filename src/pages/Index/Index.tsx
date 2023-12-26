import { Box, Container, Typography } from "@mui/material";
import { AppStats } from "~comps/AppStats.tsx/AppStats";
import { Description } from "~comps/Description/Description";
import bgImage from '../../assets/indexBG.png';

export const Index = () => {
  return (
    <>
      <AppStats />
      <Description />
      <Box sx={{backgroundImage: `url(${bgImage})`, height: '600px', backgroundPosition: 'center'}}>
        <Container sx={{display: 'flex', height: '100%', alignItems: 'center'}}>
          <Typography variant="h3" color='white' textAlign='center' >In SecureVault, privacy isn't a choice, it's a Promise!</Typography>
        </Container>
      </Box>
    </>
  );
};
