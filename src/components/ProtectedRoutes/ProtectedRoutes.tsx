import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { usePopUp } from "~utils/hooks";
import jwtDecode from "jwt-decode";
import { ITokenPayload } from "~interfaces/index";
import { SECOND, SERVER_URL } from "constants";
import { useEffect } from "react";

export const ProtectedRoutes: React.FC = () => {
  const showPopUp = usePopUp();
  const isTokenValid = useLoaderData() as boolean;
  useEffect(()=> {
    if(!isTokenValid){
      showPopUp('Session has expired. Please log in again');
    }
  }, []);
  return (
    isTokenValid ? 
    <Outlet /> :
    <Navigate to={'/login'} />
  );
};

export async function loader() {
  const token = window.localStorage.getItem('Bearer');
  if(!token) return false;
  const {exp} = jwtDecode<ITokenPayload>(token.split(' ')[1]);
  if((exp * 1000 - SECOND) < Date.now()) {
    const res = await fetch(SERVER_URL+'/auth/refresh-token');
    if(res.ok) {
      const {token}: {token: string} = await res.json();
      window.localStorage.setItem("Bearer", token);
      return true;
    } 
  }
  return false;
}

