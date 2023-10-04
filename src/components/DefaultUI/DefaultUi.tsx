import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const DefaultUI: React.FC = () => {
  const name = useSelector((state)=> state.user.name);
  console.log(name);
  return (
    <>
      <header>{name}</header>
      <main>
        <Outlet/>
      </main>
      <footer>qweqweqwe</footer>
    </>
  );
};
