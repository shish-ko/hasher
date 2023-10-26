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
    console.log(isTokenValid);
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
  const token = window.localStorage.getItem('Bearer');
  if(!token) return false;
  const {exp} = jwtDecode<ITokenPayload>(token.split(' ')[1]);
  console.log(new Date(exp*1000));
  if((exp * 1000 - SECOND) < Date.now()) {
    const res = await fetch(SERVER_URL+'auth/refresh-tokens', {credentials: 'include'});
    if(res.ok) {
      const {token}: {token: string} = await res.json();
      window.localStorage.setItem("Bearer", `Bearer ${token}`);
      return true;
    } 
  } else {
    return true;
  }
  return false;
}

