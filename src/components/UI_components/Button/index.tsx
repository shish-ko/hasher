import { Button, darken, styled } from "@mui/material";
import { COLORS } from "style/colors";

interface IAppButtonProps {
  dark?: unknown,
}

export const AppButton = styled(Button)<IAppButtonProps>(({theme, dark, disabled})=> {
  let bgColor = theme.palette.success.main;
  let textColor = 'white';

  if(dark) {
    bgColor = COLORS.lightBG;
    textColor = 'black';
  }
  if(disabled) {
    bgColor = COLORS.inputBG_light;
  }
  return {
    fontSize: theme.spacing(4),
    lineHeight: theme.spacing(4),
    borderRadius: '10px',
    textTransform: 'none',
    padding: '15px',
    backgroundColor: bgColor,
    color: textColor,
    '&:hover': {
      backgroundColor: darken(bgColor, .2)
    }
  };
});
