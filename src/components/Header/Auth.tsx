import { Link } from "react-router-dom";
import { setUserName, toggleIsLogin } from "store/store";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import { Button } from "~comps/UI_components/Button/Button";

export const Auth = () => {
  const {isLogin, name} = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const signIn = () => {
    dispatch(setUserName('shish'));
    dispatch(toggleIsLogin());
  };

  return(
    isLogin ? 
    <>{name}</> :
    <>
    <Link to={'/logIn'}>
      <Button>LogIn</Button>
    </Link>
    <Link to={'/signUp'}>
      <Button contained>SignUp</Button>
    </Link>
    </>
  );
};
