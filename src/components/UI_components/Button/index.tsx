import { Button, ButtonProps, darken, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
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

type TAppToggleBtnProps = ButtonProps & {
  inactiveIcon: string | JSX.Element,
  activeIcon: string | JSX.Element,
  isActive: boolean
}
export const AppToggleBtn: React.FC<TAppToggleBtnProps> = ({inactiveIcon, activeIcon, isActive, onClick, ...rest})=>{
  const [children, setChildren] = useState<string | JSX.Element>(inactiveIcon);
  useEffect(()=> {
    if(isActive) {
        setChildren(activeIcon);
    } else {
      setChildren(inactiveIcon);
    }
  }, [isActive]);
 

  return (
    <Button {...rest} sx={{borderColor: grey[500]}} 
      onClick={(e)=> {
        setChildren(<CircularProgress sx={{width: '20px'}} size='small' color="inherit"/>);
        onClick && onClick(e);}
      }
      variant={isActive ? 'contained' : 'outlined'}  
    >
      {children}
    </Button>
  );
};
