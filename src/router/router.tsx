import { Route, createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import { DefaultUI } from "pages/DefaultUI/DefaultUi";
import { Description } from "pages/Description/Description";
import { LogIn } from "pages/Auth/LogIn";
import { SignUp } from "pages/Auth/SignUp";


const routeObj = createRoutesFromElements(
  <Route element={<DefaultUI />} path="/">
    <Route element={<Description />} index={true} />
    <Route element={<LogIn />} path="/login" />
    <Route element={<SignUp />} path="/signup" />
  </Route>
);

export const router = createBrowserRouter(routeObj);
