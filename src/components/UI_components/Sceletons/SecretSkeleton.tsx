import { Avatar, Divider, Grid, List, Skeleton, Stack } from "@mui/material";
import React from "react";

export const SecretSkeleton: React.FC =()=> {
  return (
    <>
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack direction='row' alignItems='center' gap={2}>
            <Skeleton variant="circular"><Avatar/></Skeleton>
            <Skeleton width={100}/>
          </Stack>
        </Stack>
        <Skeleton variant="rectangular" height={400}/>
        <Grid container>
          <Grid item xs={8}>
            <List>
              <Skeleton />
              <Divider variant="middle" />
              <Skeleton />
              <Divider variant="middle" />
              <Skeleton />
              <Divider variant="middle" />
              <Skeleton />
              <Divider variant="middle" />
            </List>

          </Grid>
        </Grid>
    </>
  );
};
