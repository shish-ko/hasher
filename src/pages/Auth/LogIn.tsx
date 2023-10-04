import {useForm, SubmitHandler} from 'react-hook-form';
import { Button } from '~comps/UI_components/Button/Button';

interface ISignIn {
  login: string,
  password: string
}

export const LogIn:React.FC = () => {
  const {register, handleSubmit, reset, formState: {errors, isValid, isSubmitted} } = useForm<ISignIn>();
  const onSubmit: SubmitHandler<ISignIn> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='auth-form__item'>
          <label htmlFor='login' className='auth-form__label'>Login</label>
          <input {...register('login', {validate: loginValidator})}/>  
          {errors.login && <div className='auth-form__error'>{errors.login.message}</div>}        
        </div>
        <div className='auth-form__item'>
          <label htmlFor='password' className='auth-form__label'>Password</label>
          <input {...register('password', {validate: passwordValidator})}/>
          {errors.password && <div className='auth-form__error'>{errors.password.message}</div>}
        </div>
        <Button className='auth-form__submit' contained disabled={isSubmitted && !isValid}>Submit</Button>
      </form>
    </>
  );
};

function loginValidator (login: string) {
  if(!login) return 'provide login';
  return true; 
}
function passwordValidator (password: string) {
  if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) return 'minimum eight characters, at least one letter and one number';
  return true;
}
