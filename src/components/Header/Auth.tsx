import { Link } from "react-router-dom";
import { useAppSelector, useAuth } from "utils/hooks";
import { Button } from "~comps/UI_components/Button/Button";

export const Auth = () => {
  const { isLogin, name } = useAppSelector((store) => store.user);
  const {logOutUser} = useAuth();

  return (
    isLogin ?
      <>
        {name}
        <Button onClick={logOutUser}>Log Out</Button>
      </> :
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
