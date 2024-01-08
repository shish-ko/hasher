import { useForm, SubmitHandler } from 'react-hook-form';
import loginSrc from '~assets/login.webp';
import MailIcon from '~assets/envelope-solid.svg?react';
import LockIcon from '~assets/lock-solid.svg?react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { SERVER_URL } from 'constants';
import { usePopUp } from 'utils/hooks';
import { IAuthForm } from 'interfaces';
import { serverAPI } from '~utils/axios';
import axios from 'axios';
import { AppBlock } from '~comps/UI_components/AppBlock/AppBlock';
import { Box, Grid, InputAdornment, Link, Paper, SvgIcon, Typography } from '@mui/material';
import { AppInput } from '~comps/UI_components/Inputs';
import { AppButton } from '~comps/UI_components/Button';
import { loginValidator, passwordValidator } from '~utils/helpers';
import { grey } from '@mui/material/colors';

export const SignUp: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isValid, isSubmitted, isSubmitting } } = useForm<IAuthForm>();
  const navigate = useNavigate();
  const showPopUp = usePopUp();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    try {
      await serverAPI.post(SERVER_URL+'auth/reg', data);
      showPopUp('Profile is successfully created');
      navigate('/login');
    } catch (error) {
      if(axios.isAxiosError(error)) {
        showPopUp(error.response?.data.message, 'error');
        reset();
      }
    }
  };

  return (
    <AppBlock bgColor='white'>
    <Paper elevation={8} sx={{ padding: '130px 20px 20px' }}>
      <Grid container justifyContent='space-around' gap={10}>
        <Grid item>
          <img src={loginSrc} />
        </Grid>
        <Grid item xs={4} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h4' color='black' textAlign='center'>Member signUp</Typography>
          <Box mb={3}>
            <AppInput
              sx={{ marginBottom: 0 }}
              error={!!errors.email}
              placeholder="E-mail"
              fullWidth
              {...register('email', { validate: loginValidator })}
              InputProps={{ startAdornment: (<InputAdornment position='start'><SvgIcon component={MailIcon} fontSize='small'  inheritViewBox /></InputAdornment>) }}
            />
            {errors.email && <Typography color='error' fontSize={12} >{errors.email.message}</Typography>}
          </Box>
          <Box mb={3}>
            <AppInput
              sx={{ marginBottom: 0 }}
              error={!!errors.password}
              placeholder="Password"
              type='password'
              fullWidth
              {...register('password', { validate: passwordValidator })}
              InputProps={{ startAdornment: (<InputAdornment position='start'><SvgIcon component={LockIcon} fontSize='small' inheritViewBox /></InputAdornment>) }}
            />
            {errors.password && <Typography color='error' fontSize={12}>{errors.password.message}</Typography>}
          </Box>
          <AppButton fullWidth
            sx={{ marginTop: ({ spacing }) => spacing(10) }}
            disabled={isSubmitting || isSubmitted && !isValid}
            type='submit'
          >
            Submit
          </AppButton>
          <Typography color={grey[500]} mt={3} textAlign='center'>
            Forgot &nbsp;
            <Typography component='span' color='black'>
              Username / Password?
            </Typography>
          </Typography>
          <Typography mt={40} textAlign='center'>
            <Link component={RouterLink} to={'/login'} color='black' underline='hover'>Log into your account &raquo;</Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>

  </AppBlock>
  );
};
