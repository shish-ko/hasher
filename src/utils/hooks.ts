import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IAppDispatch, IRootState } from "store/store";

type DispatchFunc = () => IAppDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: DispatchFunc = useDispatch;
