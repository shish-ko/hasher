import { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { hidePopUp, setPopupMessage } from "store/popUpSlice";
import { IAppDispatch, IRootState, setIsLogin } from "store/store";
import { loader } from "~comps/ProtectedRoutes/ProtectedRoutes";

type DispatchFunc = () => IAppDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;

export const usePopUp = () => {
  const dispatch = useAppDispatch();

  function active(message: string, type: 'alert' | 'error' | 'info' = 'info') {
    dispatch(setPopupMessage({message, type}));
    setTimeout(()=> {dispatch(hidePopUp());}, 2500);
  }
  return active;
};

export const  useIsCheckingAuth = async() => {
  const {isLogin, name} = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(false);


    setIsChecking(true);
    const checkResult = await loader();
    dispatch(setIsLogin(checkResult));
    setIsChecking(false);
    return isChecking;

};
