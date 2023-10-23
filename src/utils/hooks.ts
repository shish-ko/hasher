import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { hidePopUp, setPopupMessage } from "store/popUpSlice";
import { IAppDispatch, IRootState } from "store/store";

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
