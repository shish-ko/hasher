import { useForm, SubmitHandler } from 'react-hook-form';
import loginSrc from '~assets/login.webp';
import MailIcon from '~assets/envelope-solid.svg?react';
import LockIcon from '~assets/lock-solid.svg?react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { IAccountInfo, IAuthForm, IToken } from 'interfaces';
import { SERVER_URL } from 'app_constants';
import { useAuth, usePopUp } from 'utils/hooks';
import { useState } from 'react';
import { serverAPI } from '~utils/axios';
import axios from 'axios';
import { AppBlock } from '~comps/UI_components/AppBlock/AppBlock';
import { Box, Grid, InputAdornment, Link, Paper, SvgIcon, Typography } from '@mui/material';
import { AppInput } from '~comps/UI_components/Inputs';
import { AppButton } from '~comps/UI_components/Button';
import { loginValidator, passwordValidator } from '~utils/helpers';
import { grey } from '@mui/material/colors';

export const LogIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm<IAuthForm>();
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setUser } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await serverAPI.post<IToken & IAccountInfo>(SERVER_URL + 'auth/login', data);
      setUser(res.data);
      showPopUp('Login successfully');
      navigate(`/user/${res.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopUp(error.response?.data.message, 'error');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <AppBlock bgColor='white'>
      <Paper elevation={8} sx={{ padding: '130px 20px 20px' }}>
        <Grid container justifyContent='space-around' gap={10}>
          <Grid item>
            <img src={loginSrc} />
          </Grid>
          <Grid item xs={4} component={'form'} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h4' textAlign='center'>Member login</Typography>
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
              <Typography component='span' color='text.primary'>
                Username / Password?
              </Typography>
            </Typography>
            <Typography mt={40} textAlign='center'>
              <Link component={RouterLink} to={'/signup'} variant='appNav' color={'text.primary'} underline='hover'>Create your account &raquo;</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

    </AppBlock>
  );
};
