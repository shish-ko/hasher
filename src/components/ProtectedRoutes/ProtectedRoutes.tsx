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
  const oldToken = window.localStorage.getItem('Bearer');
  if(!oldToken) return false;
  const {exp} = jwtDecode<ITokenPayload>(oldToken.split(' ')[1]);
  if((exp * 1000 - SECOND) < Date.now()) {
    const res = await fetch(SERVER_URL+'auth/refresh-tokens', {credentials: 'include'});
    if(res.ok) {
      const {token: newToken}: {token: string} = await res.json();
      window.localStorage.setItem("Bearer", `Bearer ${newToken}`);
      return newToken;
    } 
  } else {
    return oldToken;
  }
  return false;
}

