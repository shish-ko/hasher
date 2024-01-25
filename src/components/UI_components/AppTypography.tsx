import { Typography, TypographyProps, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CSSProperties } from "react";

export const StatTypography = styled(Typography)(() => ({
  fontSize: '1rem',
  color: grey[500],
}));

interface ITypographyCountdownProps extends TypographyProps {
  milliseconds? :boolean
}
export const TypographyCountdown = styled(Typography)<ITypographyCountdownProps>(({theme, milliseconds})=>{
  const res: CSSProperties = {
    fontFamily: "AlarmClock",
    // fontSize: '4rem',
    textAlign: 'center',
    display: 'block'
  };
  if(milliseconds){
    return {
      color: theme.palette.error.main,
      ...res,
    };
  } else{
    return {
      color: theme.palette.warning.main,
      ...res,
    };
  }
});
