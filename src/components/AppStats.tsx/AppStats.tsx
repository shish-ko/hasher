import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import { useLoaderData } from "react-router-dom";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";

export const AppStats: React.FC = () => {
  // const appStats = useLoaderData(); // TODO: add loader to router
  const theme = useTheme();

  return (
    <AppBlock bgColor="white">
      <Stack justifyContent='space-evenly' direction='row'>
        <Stack alignItems='center'>
          <CountUp end={30} style={{ ...theme.typography.h3, color: 'black', marginBottom: theme.spacing(2) }} />
          <Typography variant="h3" color='black'>users</Typography>
        </Stack>
        <Stack alignItems='center'>
          <CountUp end={20} style={{ ...theme.typography.h3, color: 'black', marginBottom: theme.spacing(2) }} />
          <Typography variant="h3" color='black'>secrets</Typography>
        </Stack>
      </Stack>
    </AppBlock>

  );
};
