import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, usePopUp } from "~utils/hooks";
import { useEffect, useState } from "react";
import { SecretForm } from "~comps/SecretForm/SecretForm";
import { IconButton, styled } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const AddButton = styled(IconButton)(({ theme }) => {
  return {
    position: 'fixed',
    right: theme.spacing(20),
    bottom: theme.spacing(20),
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  };
});

export const ProtectedRoutes: React.FC = () => {
  const showPopUp = usePopUp();
  const [isSecretFormActive, setIsSecretFormActive] = useState(false);
  const { isLogged } = useAppSelector((store) => store.user);
  useEffect(() => {
    if (!isLogged) {
      showPopUp('Session has expired. Please log in again', 'error');
    }
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.defer = true;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
    script.addEventListener('load', () => {
      window.fbAsyncInit = function () {
        FB.init({
          appId: import.meta.env.VITE_FB_APP_ID,
          xfbml: true,
          version: 'v18.0'
        });
      };
    });
    return () => { document.body.removeChild(script); };
  }, []);
  return (
    isLogged ?
      <>
        <Outlet />
        <AddButton size="large" onClick={()=>setIsSecretFormActive(!isSecretFormActive)}>
          <AddIcon htmlColor="white" />
        </AddButton>
          <SecretForm formCloseHandler={() => setIsSecretFormActive(false)} isSecretFormActive={isSecretFormActive} />
      </> :
      <Navigate to={'/login'} />
  );
};
