import { Route, createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import { DefaultUI } from "pages/DefaultUI/DefaultUi";
import { Description } from "pages/Description/Description";
import { LogIn } from "pages/Auth/LogIn";
import { SignUp } from "pages/Auth/SignUp";
import { ProtectedRoutes, loader as tokenChecker } from "~comps/ProtectedRoutes/ProtectedRoutes";
import { User } from "pages/User/User";


const routeObj = createRoutesFromElements(
  <Route element={<DefaultUI />} path="/">
    <Route element={<Description />} index={true} />
    <Route element={<LogIn />} path="/login" />
    <Route element={<SignUp />} path="/signup"/>
    <Route element={<ProtectedRoutes /> } loader={tokenChecker}>
      <Route element={<User />} path="/user" />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routeObj);
