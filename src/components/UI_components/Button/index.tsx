import { UploadFile } from "@mui/icons-material";
import { Button, FilledTextFieldProps, FormControl, FormHelperText, FormLabel, InputLabel, OutlinedTextFieldProps, StandardTextFieldProps, TextField, darken, makeStyles, styled, useTheme } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { FieldError, FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { COLORS } from "style/colors";

interface IAppButtonProps {
  dark?: unknown,
}

export const AppButton = styled(Button)<IAppButtonProps>(({ theme, dark, disabled }) => {
  let bgColor = theme.palette.success.main;
  let textColor = 'white';

  if (dark) {
    bgColor = COLORS.lightBG;
    textColor = 'black';
  }
  if (disabled) {
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


// type InputProps = React.HTMLProps<HTMLInputElement> & {error?: FieldError}
// type IUploadButtonProps = HTMLInputElement 

// export const UploadButton = forwardRef<IUploadButtonProps, InputProps>(
  
//   function UploadButton(props, ref) {
//     const [fileName, setFileName] = useState('');
        
//     const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//       props.onChange && props.onChange(e);
//       // setFileName(e.target.value);
//     };
    
//     return (
//       <FormControl>
//         <Button component='label' startIcon={<UploadFile />} variant="contained">Attach file
//           <input type="file" hidden {...props} ref={ref}  />
//         </Button>
//         <FormHelperText>{props.error ? props.error.message : fileName}</FormHelperText>
//       </FormControl>
//     );
//   }
// );
