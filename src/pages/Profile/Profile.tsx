import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Checkbox, FormControlLabel, Grid, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { AppButton } from "~comps/UI_components/Button";
import { IAccountInfo, SERVER } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { useAppSelector, useAuth } from "~utils/hooks";

export const Profile: React.FC = () => {
  const { name, userPic } = useAppSelector((store) => store.user);
  const { setUser } = useAuth();
  const [userName, setUserName] = useState(name);
  const [displayedUserPic, setDisplayedUserPic] = useState<string | null | undefined>(userPic);

  const handleUserNameChange = async () => {
    const { data } = await serverAPI.put<IAccountInfo>(SERVER.ACCOUNT_NAME, { userName });
    setUser(data);
  };
  const userPicHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setDisplayedUserPic(e.target?.result as string);
    };
    if(e.target.files?.[0]) {
      reader.readAsDataURL(e.target?.files[0]);
    }    
  };

  return (
    <AppBlock bgColor="white">
      <Typography variant="h3" textAlign='center'>Profile settings</Typography>
      <Grid container>
        <Grid item container sm={6} direction='row' gap={5} alignItems='flex-end' display='flex'>
          <Avatar sx={{ height: 250, width: 250 }} src={displayedUserPic}>
          <AccountCircleOutlined sx={{ height: 200, width: 200 }} />
          </Avatar>
          <Stack gap={2}>
            <AppButton component='label'>
              <input type="file" hidden onChange={userPicHandler} />
              {displayedUserPic ? 'Change profile photo' : 'Add profile photo'}
            </AppButton>
            <AppButton disabled={!userPic} dark={'true'}>
              Delete profile photo
            </AppButton>
          </Stack>
        </Grid>
        <Grid item sm={6} component={List} gap={4} display='flex' flexDirection='column'>
          <ListItem disableGutters>
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              variant="standard"
              label='User name'
              sx={{ mr: 4 }}
            />
            <AppButton sx={{ p: 3 }}
              disabled={userName === name}
              onClick={handleUserNameChange}>
              Change user name
            </AppButton>
          </ListItem>
          <ListItem disableGutters>
            <TextField
              defaultValue={name}
              variant="standard"
              label='Password'
              sx={{ mr: 4 }}
              type="password"
            />
            <AppButton sx={{ p: 3 }}>Change password</AppButton>
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
