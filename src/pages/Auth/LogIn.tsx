import { useForm, SubmitHandler } from 'react-hook-form';
import loginSrc from '~assets/login.webp';
import mail_icon from '~assets/envelope-solid.svg';
import lock_icon from '~assets/lock-solid.svg';
import { Link, useNavigate } from 'react-router-dom';
import { IAuthForm } from 'interfaces';
import { SERVER_URL } from 'constants';
import { usePopUp } from 'utils/hooks';
import { useState } from 'react';

export const LogIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isValid, isSubmitted} } = useForm<IAuthForm>();
  const navigate = useNavigate();
  const showPopUp = usePopUp();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    setIsSubmitting(true);
    const res = await fetch(SERVER_URL + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    if(res.ok) {
      const { token, userId }: {token: string, userId: number} = await res.json();
      window.localStorage.setItem('Bearer', `Bearer ${token}`);
      showPopUp('Login successfully');
      // navigate(`/user/${userId}`);
      navigate(`/user`);
    } else {
      const {message} = await res.json();
      showPopUp(message, 'error');
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <section className='auth'>
        <img src={loginSrc} />
        <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
          <h3 className='auth-form__item auth-form__title'>Member login</h3>
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
          <button className='auth-form__submit' disabled={isSubmitting || isSubmitted && !isValid}>Submit</button>
          <p className='auth-form__recover'>Forgot <span className='auth-form__recover_dark'>Username / Password?</span></p>
          <p className='auth-form__toggle'><Link to={'/signup'} className='text-link'>Create your account &raquo;</Link></p>
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
