import { Navigate, Outlet } from "react-router-dom";
import { usePopUp } from "~utils/hooks";
import jwtDecode from "jwt-decode";

export const ProtectedRoutes: React.FC = () => {
  const showPopUp = usePopUp();

  return (
    isTokenValid() ? 
    <Outlet /> :
    <Navigate to={'/login'} />
  );
};

export async function loader() {
  const token = window.localStorage.getItem('Bearer');
  if(!token) return false;
  const decoded = jwtDecode(token.split(' ')[1]);
  console.log(decoded);
  return true;
}

