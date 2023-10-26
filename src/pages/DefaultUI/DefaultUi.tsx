import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "~comps/Header/Header";
import { PopUp } from "~comps/UI_components/PopUp/PopUp";
import { useAppDispatch } from "~utils/hooks";
import { PropagateLoader } from 'react-spinners';
import { setIsLogin } from "store/store";
import { loader } from "~comps/ProtectedRoutes/ProtectedRoutes";

export const DefaultUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    async function authChecker() {
      setIsChecking(true);
      const checkResult = await loader();
      dispatch(setIsLogin(checkResult));
      setIsChecking(false);
    }
    authChecker();
  }, []);
  


  return (
    isChecking ?
      <PropagateLoader /> :
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
