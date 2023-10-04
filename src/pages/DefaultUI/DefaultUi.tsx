import React from "react";
import { Outlet } from "react-router-dom";
import { incrementRank } from "store/store";
import { useAppDispatch } from "utils/hooks";
import { Header } from "~comps/Header/Header";

export const DefaultUI: React.FC = () => {
  const dispatch = useAppDispatch();
  dispatch(incrementRank()); 

  // console.log(rank);
  return (
    <>
      <Header/>
      <main className="app-container app-main">
        <Outlet/>
      </main>
      <footer>qweqweqwe</footer>
    </>
  );
};
