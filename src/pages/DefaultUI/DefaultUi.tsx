import React, { CSSProperties, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "~comps/Header/Header";
import { PopUp } from "~comps/UI_components/PopUp/PopUp";
import { useAuth } from "~utils/hooks";
import { PropagateLoader } from 'react-spinners';
import { loader } from '~utils/helpers';
import { LOADER_COLOR } from "../../constants";

const loaderStyles: CSSProperties ={
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const DefaultUI: React.FC = () => {
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
      <PropagateLoader cssOverride={loaderStyles} color={LOADER_COLOR} size={23}/> :
      <>
        <Header />
        <main className="app-container app-main">
          <Outlet />
        </main>
        <PopUp />
        <footer>qweqweqwe</footer>
      </>
  );
};
