import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, usePopUp } from "~utils/hooks";
import { useEffect } from "react";

export const ProtectedRoutes: React.FC = () => {
  const showPopUp = usePopUp();
  const {isLogin} = useAppSelector((store)=> store.user);
  useEffect(()=> {
    if(!isLogin){
      showPopUp('Session has expired. Please log in again', 'alert');
    }
  }, []);
  return (
    isLogin ? 
    <Outlet /> :
    <Navigate to={'/login'} />
  );
};
