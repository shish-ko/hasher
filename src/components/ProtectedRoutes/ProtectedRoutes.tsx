import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, usePopUp } from "~utils/hooks";
import { useEffect, useState } from "react";
import { NewSecretButton } from "~comps/UI_components/Button/NewSecretButton";
import { SecretForm } from "~comps/SecretForm/SecretForm";
import Popup from "reactjs-popup";

export const ProtectedRoutes: React.FC = () => {
  const showPopUp = usePopUp();
  const [isSecretFormActive, setIsSecretFormActive] = useState(false);
  const {isLogin} = useAppSelector((store)=> store.user);
  useEffect(()=> {
    if(!isLogin){
      showPopUp('Session has expired. Please log in again', 'alert');
    }
    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.defer= true;
    script.async=true;
    script.crossOrigin='anonymous';
    document.body.appendChild(script);
    script.addEventListener('load', ()=> {
      window.fbAsyncInit = function() {
        FB.init({
          appId            : import.meta.env.VITE_FB_APP_ID,
          xfbml            : true,
          version          : 'v18.0'
        });
      };
      console.log(window.fbAsyncInit);
    });
    return ()=> {document.body.removeChild(script);};
  }, []);
  return (
    isLogin ? 
    <>
      <Outlet />
      <NewSecretButton clickHandler={()=>{setIsSecretFormActive(!isSecretFormActive);}}/>
      <Popup open={isSecretFormActive} onClose={()=>setIsSecretFormActive(false)}>
        <SecretForm formCloseHandler={()=>setIsSecretFormActive(false)}/>
      </Popup>
    </> :
    <Navigate to={'/login'} />
  );
};
