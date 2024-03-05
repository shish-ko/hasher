import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Button, Checkbox, FormControlLabel, Grid, List, ListItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { ONE_MB, SERVER_URL } from "app_constants";
import { ChangeEvent, useState } from "react";
import { updateAccountInfo } from "store/userSlice";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { AppButton } from "~comps/UI_components/Button";
import { IAccountInfo, SERVER } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { useAppDispatch, useAppSelector, useAuth, usePopUp } from "~utils/hooks";

export const Profile: React.FC = () => {
  const { name, userPic, emailSubs } = useAppSelector((store) => store.user);
  const { setUser } = useAuth();
  const [displayedUserName, setDisplayedUserName] = useState(name);
  const [displayedUserPic, setDisplayedUserPic] = useState(userPic ? SERVER_URL + userPic : undefined);
  const showPopUp = usePopUp();
  const [pickedFile, setPickedFile] = useState<File>();
  const dispatch = useAppDispatch();

  const userPicHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      setDisplayedUserPic(e.target?.result as string);
    };
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/jpeg') {
        showPopUp('File type is not supported.', 'error');
      } else if (file.size > 5 * ONE_MB) {
        showPopUp('File size exceed 5mB.', 'error');
      } else {
        reader.readAsDataURL(file);
        setPickedFile(file);
      }
    }
  };

  const changeUserName = async () => {
    await dispatch(updateAccountInfo({name: displayedUserName}));
    showPopUp("User name successfully changed");
  };
  
  const toggleEmailSubs = async (_, emailSubs: boolean) => {
    await dispatch(updateAccountInfo({emailSubs}));
    if(emailSubs) {
      showPopUp("You will receive e-mail notifications when secrets, you subscribed to, become available");
    } else {
      showPopUp("You will NOT receive e-mail notifications when secrets, you subscribed to, become available");
    }
  };

  const cancelUserPicChange = () => {
    setDisplayedUserPic(userPic ? SERVER_URL + userPic : undefined);
  };

  const submitUserPicChange = async () => {
    const formData= new FormData();
    formData.append('userPic', pickedFile!);
    const {data} = await serverAPI.put<IAccountInfo>(SERVER.ACCOUNT_USERPIC, formData);
    setUser(data);
    setDisplayedUserPic(data.userPic ? SERVER_URL + data.userPic : undefined);
    showPopUp('UserPic successfully updated');
  };

  const deleteUserPic = async () => {
    const {data} = await serverAPI.delete<IAccountInfo>(SERVER.ACCOUNT_USERPIC);
    setUser(data);
    setDisplayedUserPic(undefined);
    showPopUp('User picture has been reset');
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
            <Tooltip title='File type: jpg, max-size: 5mb' placement="top-end">
              <Button component='label' variant="contained" color="success">
                <input type="file" hidden onChange={userPicHandler} />
                {displayedUserPic ? 'Change profile photo' : 'Add profile photo'}
              </Button>
            </Tooltip>
            {userPic == displayedUserPic?.replace(SERVER_URL, '') ?
              <Button disabled={!userPic} color='error' onClick={deleteUserPic}>
                Delete profile photo
              </Button> :
              <Stack direction='row' justifyContent='space-around'>
                <Button onClick={submitUserPicChange}>submit</Button>
                <Button onClick={cancelUserPicChange} color="error">cancel</Button>
              </Stack>
            }
          </Stack>
        </Grid>
        <Grid item sm={6} component={List} gap={4} display='flex' flexDirection='column'>
          <ListItem disableGutters>
            <TextField
              value={displayedUserName}
              onChange={(e) => setDisplayedUserName(e.target.value)}
              variant="standard"
              label='User name'
              sx={{ mr: 4 }}
            />
            <AppButton sx={{ p: 3 }}
              disabled={displayedUserName === name}
              onClick={changeUserName}>
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
            <FormControlLabel 
              control={<Checkbox defaultChecked={emailSubs} onChange={toggleEmailSubs}/>}
              label='Receive email notifications when secrets you subscribed to becomes available' 
            />
          </ListItem>
        </Grid>
      </Grid>
      <Stack direction='row' gap={5} alignItems='flex-end'>
      </Stack>
    </AppBlock>
  );
};
