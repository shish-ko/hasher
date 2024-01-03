import { TextField, styled } from "@mui/material";
import { COLORS } from "style/colors";

export const AppInput = styled(TextField)(({theme})=>{
  return({
    backgroundColor: COLORS.inputBG_dark,
    fontSize: theme.spacing(4),
    borderRadius: '10px',
    marginBottom: '10px',
    '& .MuiOutlinedInput-root.Mui-focused': {
      '.MuiOutlinedInput-notchedOutline': {
        borderColor: 'red'
      }
    }
  });

});

