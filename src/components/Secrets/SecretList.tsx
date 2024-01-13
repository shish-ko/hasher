import React from "react";
import { IUserFetchRes } from "~interfaces/index";
import { AvailableSecret } from "./AvailableSecret";
import { Box, Stack, Typography } from "@mui/material";
import { FutureSecret } from "./FutureSecret";

interface ISecretsList {
  secrets: IUserFetchRes,
  expiredSecretHandler: () => void,
}

export const SecretsList: React.FC<ISecretsList> = ({ secrets: {availableSecrets, futureSecrets}, expiredSecretHandler }) => {
  return (
    <>
      <Box mb={25}>
        {
          availableSecrets.length ?
            <>
              <Typography variant="h3" color="white" textAlign='center'>Available secrets:</Typography>
              <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10}>
                {availableSecrets.map((secret) => <AvailableSecret {...secret} />)}
              </Stack>
            </> :
            <Typography variant="h3" color="white" textAlign='center'>There is no available secrets</Typography>
        }
      </Box>
      <Box>
        {
          futureSecrets.length ?
            <>
              <Typography variant="h3" color="white" textAlign='center'>Future secrets:</Typography>
              <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10}>
                {futureSecrets.map((secret) => <FutureSecret {...secret} countdownHandler={expiredSecretHandler} />)}
              </Stack>
            </> :
            <Typography variant="h3" color="white" textAlign='center'>There is no future secrets</Typography>
        }
      </Box>
    </>
  );
};
