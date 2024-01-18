import { Share } from "@mui/icons-material";
import { Avatar, Button, ButtonGroup, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { AvailableSecret } from "~comps/Secrets/AvailableSecret";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { IFutureSecret, ISecret, SERVER } from "~interfaces/index";
import { useServerFetch } from "~utils/hooks";

export const Secret = () => {
  const { secretId } = useParams();
  // let { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId, '/');
  let { res, refetch } = useServerFetch<ISecret | IFutureSecret>(SERVER.SECRET + secretId);
  if (import.meta.env.VITE_AUTH_FREE) {
    res = undefined;
  }
  const isAvailableSecret = res && ('url' in res) && ('description' in res);
  return (
    <AppBlock>
      <Paper elevation={14} component={Stack} gap={4} p={5}>
        <Stack direction='row' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' gap={2} component={Link} to={'#'}>
            <Avatar>Avatr</Avatar>
            <Typography>Name</Typography>
          </Stack>
          <ButtonGroup>
            <Button>qwe</Button>
            <Button>qwe</Button>
            <Button>qwe</Button>
          </ButtonGroup>
        </Stack>
        {/* {media} */}
        <Grid container alignItems='center'>
          <Grid item xs={1}>
            <Typography>Views</Typography>
            <Typography>1,000</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>Views</Typography>
            <Typography>1,000</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography>Views</Typography>
            <Typography>1,000</Typography>
          </Grid>
          <Grid item xs={1}>
            <Share />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <List>
              <ListItem>
                <Stack direction='row' justifyContent='space-between' width='100%' alignItems='flex-end'>
                  <Typography>Created at</Typography>
                  <Typography sx={{maxWidth: '50%', wordWrap: 'break-word'}}>ppeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeep</Typography>
                </Stack>
              </ListItem>
              <Divider variant="middle" />
              <ListItem>
                Available at ....... pppp
              </ListItem>
              <Divider variant="middle" />
              <ListItem>
                Title ....... pppp
              </ListItem>
              <Divider variant="middle" />
              <ListItem>
                Description ....... pppp
              </ListItem>
              <Divider variant="middle" />
            </List>

          </Grid>
        </Grid>
      </Paper>
      {
        res ?
          isAvailableSecret ? <AvailableSecret {...res} /> : <></>
          :
          <></>
      }
    </AppBlock>
  );
};
