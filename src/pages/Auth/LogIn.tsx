import { useForm, SubmitHandler } from 'react-hook-form';
import loginSrc from '~assets/login.webp';
import mail_icon from '~assets/envelope-solid.svg';
import lock_icon from '~assets/lock-solid.svg';
import { Link, useNavigate } from 'react-router-dom';
import { IAuthForm, ITokenPayload } from 'interfaces';
import { SERVER_URL } from 'constants';
import { useAuth, usePopUp } from 'utils/hooks';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { serverAPI } from '~utils/axios';
import axios from 'axios';
import { AppBlock } from '~comps/UI_components/AppBlock/AppBlock';
import { Grid, InputAdornment, Paper, Typography } from '@mui/material';
import { COLORS } from 'style/colors';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { AppInput } from '~comps/UI_components/Inputs';

export const LogIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted } } = useForm<IAuthForm>();
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setUser } = useAuth();

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await serverAPI.post(SERVER_URL + 'auth/login', data);
      const { token }: { token: string } = res.data;
      const { id } = jwtDecode<ITokenPayload>(token);
      setUser(token);
      showPopUp('Login successfully');
      navigate(`/user/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showPopUp(error.response?.data.message, 'error');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <AppBlock bgColor='white'>
      <Paper elevation={8} sx={{padding: '130px 20px 20px'}}>
        <Grid container justifyContent='space-around' gap={10}>
          <Grid item>
            <img src={loginSrc} />
          </Grid>
          <Grid item xs={4} component={'form'}  onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h4' color='black'>Member login</Typography>
            <AppInput placeholder="e-mail" fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><MailIcon fontSize='small'/></InputAdornment>)}}/>
            <AppInput placeholder="password" fullWidth InputProps={{startAdornment: (<InputAdornment position='start'><LockIcon fontSize='small'/></InputAdornment>)}}/>
            <div className='auth-form__item'>
              <div className='auth-form__custom-input'>
                <input className='auth-form__input' {...register('email', { validate: loginValidator })} placeholder='Login' />
                <img className='auth-form__input-icon' src={mail_icon} />
              </div>
              {errors.email && <p className='auth-form__error'>{errors.email.message}</p>}
            </div>
            <div className='auth-form__item'>
              <div className='auth-form__custom-input'>
                <input className='auth-form__input' type='password' {...register('password', { validate: passwordValidator })} placeholder='Password' />
                <img className='auth-form__input-icon' src={lock_icon} />
              </div>
              {errors.password && <p className='auth-form__error'>{errors.password.message}</p>}
            </div>
            <button className='auth-form__submit' disabled={isSubmitting || isSubmitted && !isValid}>Submit</button>
            <p className='auth-form__recover'>Forgot <span className='auth-form__recover_dark'>Username / Password?</span></p>
            <p className='auth-form__toggle'><Link to={'/signup'} className='text-link'>Create your account &raquo;</Link></p>
          </Grid>
        </Grid>
      </Paper>

    </AppBlock>
  );
};

function loginValidator(login: string) {
  if (!login) return 'provide login';
  return true;
}
function passwordValidator(password: string) {
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) return 'minimum eight characters, at least one letter and one number';
  return true;
}
