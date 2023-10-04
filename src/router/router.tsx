import { Route, createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import { DefaultUI } from "pages/DefaultUI/DefaultUi";
import { Description } from "pages/Description/Description";
import { LogIn } from "pages/Auth/LogIn";


const routeObj = createRoutesFromElements(
  <Route element={<DefaultUI />} path="/">
    <Route element={<Description />} index={true} />
    <Route element={<LogIn />} path="/logIn" />
    {/* <Route element={<Description />}   index={true} /> */}
  </Route>
);

export const router = createBrowserRouter(routeObj);
