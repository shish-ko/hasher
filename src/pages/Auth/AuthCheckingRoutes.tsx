import { useAuth } from "~utils/hooks";
import {useState, useEffect, CSSProperties} from 'react';
import { loader } from '~utils/helpers';
import { PropagateLoader } from "react-spinners";
import { LOADER_COLOR } from "../../constants";
import { Outlet } from "react-router-dom";

const loaderStyles: CSSProperties ={
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

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
      <PropagateLoader cssOverride={loaderStyles} color={LOADER_COLOR} size={23}/> 
      :
      <Outlet />
  );

};
