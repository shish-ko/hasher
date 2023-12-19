import { useAuth } from "~utils/hooks";
import {useState, useEffect, CSSProperties} from 'react';
import { loader } from '~utils/helpers';
import { PropagateLoader } from "react-spinners";
import { LOADER_COLOR } from "../../constants";
import { Outlet } from "react-router-dom";

export const AuthCheckingRoutes: React.FC = () => {
  const {setUser} = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function authChecker() {
      const token = await loader();
      if(token) {
        setUser(token);
      }
      setIsChecking(false);
    }
    authChecker();
  }, []);

  return (
    isChecking ?
      <PropagateLoader color={LOADER_COLOR} size={23}/> 
      :
      <Outlet />
  );

};
