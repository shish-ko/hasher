import React from "react";
import { Auth } from "./Auth";

export const Header: React.FC = () => {
  return (
    <div className="header-container">
      <header className="app-container header">
        <div className="header__item"></div>
        <h1 className="header__item header__item_center">Hasher</h1>
        <div className="header__item header__item_right">
          <Auth/> 
        </div>
      </header>
    </div>
  );
};
