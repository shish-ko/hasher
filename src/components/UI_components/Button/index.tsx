import { Button, styled } from "@mui/material";
import { COLORS } from "style/colors";

export const AppButton = styled(Button)(({theme})=> {
  return {
    fontSize: theme.spacing(4),
    borderRadius: '10px',
    textTransform: 'none',
    padding: '15px',
    backgroundColor: COLORS.lightBG,
    color: 'black'
  };
});
