import { TextField, styled } from "@mui/material";
import { COLORS } from "style/colors";

interface IAppInput {
  dark?: unknown,
}

export const AppInput = styled(TextField, {})<IAppInput>(({ theme, dark, error }) => {
  let bgColor = COLORS.lightBG;
  let textColor = COLORS.appNav;
  let labelColor = COLORS.appNav;
  let activeBorderColor = COLORS.appNav;

  if (dark) {
    bgColor = COLORS.inputBG_dark;
    textColor = theme.palette.text.primary;
    labelColor = COLORS.lightBG;
    activeBorderColor = COLORS.lightBG;
  }
  if (error) {
    activeBorderColor = theme.palette.error.main;
  }
  return {
    backgroundColor: bgColor,
    color: textColor,
    fontSize: theme.spacing(4),
    borderRadius: '10px',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      '&.Mui-focused': {
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: activeBorderColor,
        }

      }
    },
    '& .MuiOutlinedInput-input': {
      color: textColor,
    },
    '& label, label.Mui-focused': {
      color: labelColor,
    },
  };

});
