import { Link } from "react-router-dom";
import { useAppSelector, useAuth } from "utils/hooks";
import { Button } from "~comps/UI_components/Button/Button";

export const Auth = () => {
  const { isLogin, name, id } = useAppSelector((store) => store.user);
  const {logOutUser} = useAuth();

  return (
    isLogin ?
      <>
        <Link to={`user/${id}`}> {name} </Link>
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
