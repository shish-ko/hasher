import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, usePopUp } from "~utils/hooks";
import jwtDecode from "jwt-decode";
import { ITokenPayload } from "~interfaces/index";
import { SECOND, SERVER_URL, TEST_TOKEN } from "constants";
import { useEffect } from "react";
import { serverAPI } from "~utils/axios";

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

export async function loader() {
  if(import.meta.env.VITE_AUTH_FREE) return TEST_TOKEN; 
  const oldToken = window.localStorage.getItem('Bearer');
  if(!oldToken) return false;
  const {exp} = jwtDecode<ITokenPayload>(oldToken.split(' ')[1]);
  if((exp * 1000 - SECOND) < Date.now()) {
    try {
      console.log('loader '+ Date.now());
      const res = await serverAPI.get(SERVER_URL+'auth/refresh-tokens');
      const {token: newToken}: {token: string} = res.data;
      console.log(newToken);
      window.localStorage.setItem("Bearer", `Bearer ${newToken}`);
      return newToken;
    } catch {
      window.localStorage.removeItem("Bearer");
      return null;
    }
  } else {
    return oldToken;
  }
}

