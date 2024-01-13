import { Box, Button, Typography } from "@mui/material";
import { SERVER_URL } from "constants";
import React from "react";
import { ISecretProps } from "~interfaces/index";

export const DocSecret: React.FC<ISecretProps> = ({url}) => {
  return (
    <>
      <Typography sx={{ textAlign: 'justify', color: 'black', backgroundColor: 'white', maxHeight: '200px', overflow: 'hidden' }}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et mollis sem. Etiam laoreet gravida ante. Pellentesque finibus nisl id nibh posuere, consequat feugiat mauris viverra. Pellentesque euismod sem a felis vehicula auctor. Donec at dui est. Fusce sit amet nibh aliquam, dictum magna vitae, varius lorem. Nulla facilisi.'.repeat(2)}</Typography>
      <Box sx={{position: 'absolute', top:0, left: 0, bottom: 0, right: 0, backdropFilter: 'blur(2px)'}}>
        <Button LinkComponent='a' download={true} href={SERVER_URL+url} variant="contained" sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>Download</Button>
      </Box>
    </>
  );
};
