import { Link } from "react-router-dom";
import { useAppSelector } from "utils/hooks";
import { Button } from "~comps/UI_components/Button/Button";

export const Auth = () => {
  const {isLogin, name} = useAppSelector((store) => store.user);

  return(
    isLogin ? 
    <>{name}</> :
    <>
    <Link to={'/login'}>
      <Button>LogIn</Button>
    </Link>
    <Link to={'/signup'}>
      <Button contained>SignUp</Button>
    </Link>
    </>
  );
};
