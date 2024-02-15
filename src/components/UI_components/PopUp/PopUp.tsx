import { Alert, Snackbar } from "@mui/material";
import { hidePopUp } from "store/popUpSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";

export const PopUp: React.FC = () => {
  const { isActive, message, type } = useAppSelector((store) => store.popUp);
  const dispatch = useAppDispatch();
  return (
    <Snackbar open={isActive} onClose={() => dispatch(hidePopUp())} autoHideDuration={2500}>
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};

//TODO multi-messages popUp
