import { Outlet } from "react-router-dom";
import { Footer } from "~comps/Footer/Footer";
import { Header } from "~comps/Header/Header";
import { PopUp } from "~comps/UI_components/PopUp/PopUp";

export const DefaultUI: React.FC = () => {
  
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <PopUp />
      <Footer />
    </>
  );
};
