import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Checkbox, FormControlLabel, Grid, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { AppButton } from "~comps/UI_components/Button";
import { IAccountInfo, SERVER } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { useAppSelector } from "~utils/hooks";

export const Profile: React.FC = () => {
  const { name, userPic } = useAppSelector((store) => store.user);
  const [userName, setUserName] = useState(name);

  const handleUserNameChange = async () => {
    const accountInfo = await serverAPI.put<IAccountInfo>(SERVER.ACCOUNT_NAME, {userName});
    return
  };

  return (
    <AppBlock bgColor="white">
      <Typography variant="h3" textAlign='center'>Profile settings</Typography>
      <Grid container>
        <Grid item sm={6} direction='row' gap={5} alignItems='flex-end' display='flex'>
          <Avatar sx={{ height: 250, width: 250 }}>
            {userPic ? <img src={userPic} alt="user picture" /> : <AccountCircleOutlined sx={{ height: 200, width: 200 }} />}
          </Avatar>
          <Stack gap={2}>
            <AppButton >
              {userPic ? 'Change profile photo' : 'Add profile photo'}
            </AppButton>
            <AppButton disabled={!userPic} dark={true}>
              Delete profile photo
            </AppButton>
          </Stack>
        </Grid>
        <Grid item sm={6} component={List} gap={4} display='flex' flexDirection='column'>
          <ListItem disableGutters>
            <TextField
              value={userName}
              onChange={(e)=> setUserName(e.target.value)}
              variant="standard"
              label='User name'
              sx={{ mr: 4 }}
            />
            <AppButton sx={{p: 3}} disabled={userName===name}>Change user name</AppButton>
          </ListItem>
          <ListItem disableGutters>
            <TextField
              defaultValue={name}
              variant="standard"
              label='Password'
              sx={{ mr: 4 }}
              type="password"
            />
            <AppButton sx={{p: 3}}>Change password</AppButton>
          </ListItem>
          <ListItem disableGutters>
            <FormControlLabel control={<Checkbox />} label='Receive email notifications when secrets you subscribed to becomes available' />

          </ListItem>
        </Grid>
      </Grid>
      <Stack direction='row' gap={5} alignItems='flex-end'>
      </Stack>
    </AppBlock>
  );
};
