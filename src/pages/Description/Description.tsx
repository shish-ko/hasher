import { setPopupMessage } from "store/popUpSlice";
import { useAppDispatch } from "utils/hooks";

export const Description = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <h3 onClick={()=> dispatch(setPopupMessage({message:'hello', type: 'alert'}))}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </h3>
    </>
  );
};
