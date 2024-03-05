import { AccountCircleOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, Grow, List, ListItem, Slide, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { ONE_MB, SERVER_URL } from "app_constants";
import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateAccountInfo } from "store/userSlice";
import { AppBlock } from "~comps/UI_components/AppBlock/AppBlock";
import { AppButton } from "~comps/UI_components/Button";
import { IAccountInfo, SERVER } from "~interfaces/index";
import { serverAPI } from "~utils/axios";
import { passwordValidator } from "~utils/helpers";
import { useAppDispatch, useAppSelector, useAuth, usePopUp } from "~utils/hooks";


interface IPasswordChangeForm {
  oldPassword: string;
  newPassword: string;
}

export const Profile: React.FC = () => {
  const { name, userPic, emailSubs } = useAppSelector((store) => store.user);
  const { setUser } = useAuth();
  const [displayedUserName, setDisplayedUserName] = useState(name);
  const [displayedUserPic, setDisplayedUserPic] = useState(userPic ? SERVER_URL + userPic : undefined);
  const showPopUp = usePopUp();
  const [pickedFile, setPickedFile] = useState<File>();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IPasswordChangeForm>();
  const [isPasswordFormActive, setIsPasswordFormActive] = useState(false);
  const slideContainer = useRef<HTMLLIElement>(null);

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
    await dispatch(updateAccountInfo({ name: displayedUserName }));
    showPopUp("User name successfully changed");
  };

  const toggleEmailSubs = async (_, emailSubs: boolean) => {
    await dispatch(updateAccountInfo({ emailSubs }));
    if (emailSubs) {
      showPopUp("You will receive e-mail notifications when secrets, you subscribed to, become available");
    } else {
      showPopUp("You will NOT receive e-mail notifications when secrets, you subscribed to, become available");
    }
  };

  const cancelUserPicChange = () => {
    setDisplayedUserPic(userPic ? SERVER_URL + userPic : undefined);
  };

  const submitUserPicChange = async () => {
    const formData = new FormData();
    formData.append('userPic', pickedFile!);
    const { data } = await serverAPI.put<IAccountInfo>(SERVER.ACCOUNT_USERPIC, formData);
    setUser(data);
    setDisplayedUserPic(data.userPic ? SERVER_URL + data.userPic : undefined);
    showPopUp('UserPic successfully updated');
  };

  const deleteUserPic = async () => {
    const { data } = await serverAPI.delete<IAccountInfo>(SERVER.ACCOUNT_USERPIC);
    setUser(data);
    setDisplayedUserPic(undefined);
    showPopUp('User picture has been reset');
  };

  const passwordChangeHandler: SubmitHandler<IPasswordChangeForm> = async (data) => {
    try {
      await serverAPI.put(SERVER.ACCOUNT_PASSWORD, data);
      reset();
      setIsPasswordFormActive(false);
      showPopUp('Password successfully updated');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopUp(error.response?.data.message, 'error');
      }
    }
  };

  return (
    <AppBlock bgColor="white">
      <Typography variant="h3" textAlign='center'>Profile settings</Typography>
      <Grid container alignItems='flex-start'>
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
        <Grid item sm={4} component={List} gap={4} display='flex' flexDirection='column' disablePadding>
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
            <FormControlLabel
              control={<Checkbox defaultChecked={emailSubs} onChange={toggleEmailSubs} />}
              label='Receive email notifications when secrets you subscribed to becomes available'
            />
          </ListItem>
          <ListItem disableGutters ref={slideContainer} sx={{ display: 'block', overflow: 'hidden' }}>
            <Slide direction='down' appear={false} in={!isPasswordFormActive} container={slideContainer.current}>
              <AppButton fullWidth={true} onClick={() => setIsPasswordFormActive(true)}>Change account password</AppButton>
            </Slide>            
              <form onSubmit={handleSubmit(passwordChangeHandler)}>
                <Grow in={isPasswordFormActive} timeout={{exit: 2000}}>
                  <FormControl fullWidth={true}>
                    <TextField
                      variant="standard"
                      label='New password'
                      sx={{ mr: 4 }}
                      type="password"
                      {...register('newPassword', { validate: passwordValidator })}
                    />
                    <FormHelperText error={!!errors.newPassword}>{errors.newPassword?.message}</FormHelperText>
                  </FormControl>
                </Grow>
                <Grow in={isPasswordFormActive} timeout={{enter: 1000, exit: 1000}} >
                  <FormControl fullWidth={true}>
                    <TextField
                      variant="standard"
                      label='Old password'
                      sx={{ mr: 4 }}
                      type="password"
                      {...register('oldPassword', { validate: passwordValidator })}
                    />
                    <FormHelperText error={!!errors.oldPassword}>{errors.oldPassword?.message}</FormHelperText>
                  </FormControl>
                </Grow>
                <Grow in={isPasswordFormActive} timeout={{enter: 2000}}>
                  <Box mt={2}>
                    <Button type="submit">Change password</Button>
                    <Button color="error" onClick={() => { reset(); setIsPasswordFormActive(false);}}>Cancel</Button>
                  </Box>
                </Grow>
              </form>
          </ListItem>
        </Grid>
      </Grid>
      <Stack direction='row' gap={5} alignItems='flex-end'>
      </Stack>
    </AppBlock>
  );
};
