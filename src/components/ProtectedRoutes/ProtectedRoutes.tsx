import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { usePopUp } from "~utils/hooks";
import jwtDecode from "jwt-decode";
import { ITokenPayload } from "~interfaces/index";
import { SECOND, SERVER_URL, TEST_TOKEN } from "constants";
import { useEffect } from "react";
import { serverAPI } from "~utils/axios";

export const ProtectedRoutes: React.FC = () => {
  const showPopUp = usePopUp();
  const isTokenValid = useLoaderData() as boolean;
  useEffect(()=> {
    if(!isTokenValid){
      showPopUp('Session has expired. Please log in again', 'alert');
    }
  }, []);
  return (
    isTokenValid ? 
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
      const res = await serverAPI.get(SERVER_URL+'auth/refresh-tokens');
      const {token: newToken}: {token: string} = res.data;
      console.log(newToken);
      window.localStorage.setItem("Bearer", `Bearer ${newToken}`);
      return newToken;
    } catch {
      return;
    }
  } else {
    return oldToken;
  }
}

