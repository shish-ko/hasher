import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "~comps/Header/Header";
import { PopUp } from "~comps/UI_components/PopUp/PopUp";

export const DefaultUI: React.FC = () => {
  
  return (
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
