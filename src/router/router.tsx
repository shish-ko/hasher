import { Route, createBrowserRouter,createRoutesFromElements } from "react-router-dom";
import { DefaultUI } from "~comps/DefaultUI/DefaultUi";


const routeObj = createRoutesFromElements(
  <Route element={<DefaultUI />} path="/">

  </Route>
);

export const router = createBrowserRouter(routeObj);
