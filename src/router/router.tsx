import { Route, createRoutesFromElements } from "react-router-dom";
import { DefaultUI } from "pages/DefaultUI/DefaultUi";
import { Index } from "pages/Index/Index";
import { LogIn } from "pages/Auth/LogIn";
import { SignUp } from "pages/Auth/SignUp";
import { ProtectedRoutes } from "~comps/ProtectedRoutes/ProtectedRoutes";
import { User } from "pages/User/User";
import { AuthCheckingRoutes } from "pages/Auth/AuthCheckingRoutes";
import { FB_Secret, loader as scraperLoader } from "pages/Scrapers/FB_Secret";
import { Secret } from "pages/Secret/Secret";
import { Profile } from "pages/Profile/Profile";


export const routeObj = createRoutesFromElements(
  <Route element={<DefaultUI />} path="/">
    <Route element={ <AuthCheckingRoutes />} >
      <Route element={<Index />} index={true} />
      <Route element={<LogIn />} path="/login" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<ProtectedRoutes />} >
        <Route element={<Profile/>} path="/profile" />
        <Route element={<User />} path="/user/:userId" />
        <Route element={<Secret />} path="/secret/:secretId" />
      </Route>
    </Route>
    <Route path="/fb_scraper/secret/:secretId" element={<FB_Secret />} loader={scraperLoader}/>
  </Route>
);

