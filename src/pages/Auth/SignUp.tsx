import { useForm, SubmitHandler } from 'react-hook-form';
import loginSrc from '~assets/login.webp';
import mail_icon from '~assets/envelope-solid.svg';
import lock_icon from '~assets/lock-solid.svg';
import { Link, useNavigate } from 'react-router-dom';
import { SERVER_URL } from 'constants';
import { usePopUp } from 'utils/hooks';
import { IAuthForm } from 'interfaces';
import { serverAPI } from '~utils/axios';
import axios from 'axios';

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
    <>
      <section className='auth'>
        <img src={loginSrc} />
        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='auth-form__item auth-form__title'>Member signUp</h3>
          <div className='auth-form__item'>
            <div className='auth-form__custom-input'>
              <input className='auth-form__input' {...register('email', { validate: loginValidator })} placeholder='Login' />
              <img className='auth-form__input-icon' src={mail_icon} />
            </div>
            {errors.email && <p className='auth-form__error'>{errors.email.message}</p>}
          </div>
          <div className='auth-form__item'>
            <div className='auth-form__custom-input'>
              <input className='auth-form__input' type='password' {...register('password', { validate: passwordValidator })} placeholder='Password'/>
              <img className='auth-form__input-icon' src={lock_icon} />
            </div>
            {errors.password && <p className='auth-form__error'>{errors.password.message}</p>}
          </div>
          <button className='auth-form__submit' disabled={isSubmitted && isSubmitting && !isValid}>Submit</button>
          <p className='auth-form__recover'>Forgot <span className='auth-form__recover_dark'>Username / Password?</span></p>
          <p className='auth-form__toggle'><Link to={'/login'} className='text-link'>Log into your account &raquo;</Link> </p>
        </form>
      </section>
    </>
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
