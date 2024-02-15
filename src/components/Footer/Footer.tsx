import { Box, Link, Stack, Typography } from "@mui/material";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { Facebook, Twitter, YouTube } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <AppBlock>
      <Box sx={{margin: '0 auto', width: 'fit-content'}} component='footer'>
        <Stack direction={"row"} gap={5} sx={{margin: '0 auto', width: 'fit-content'}}>
          <Link component={RouterLink} to={'#'}><Twitter fontSize="large" htmlColor="white"/></Link>
          <Link component={RouterLink} to={'#'}><YouTube fontSize="large" htmlColor="white"/></Link>
          <Link component={RouterLink} to={'#'}><Facebook fontSize="large" htmlColor="white"/></Link>
        </Stack>
        <Typography mt={7} color='text.secondary'>©SecretService 2023</Typography>
      </Box>
    </AppBlock>
  );
};

