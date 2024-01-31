import Facebook from "@mui/icons-material/Facebook";
import Share from "@mui/icons-material/Share";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import { SpeedDial, SpeedDialAction, SpeedDialIcon, SpeedDialProps } from "@mui/material";

export const ShareBlock: React.FC<Omit<SpeedDialProps, 'ariaLabel'>> =(props)=>{
  return (
    <SpeedDial {...props} ariaLabel="social_share" FabProps={{size: 'small', color: 'shareBlock', sx: {backgroundColor: 'white', boxShadow: 'none', '&:hover': {backgroundColor: 'white'}}}} icon={<SpeedDialIcon icon={<Share />} sx={{'& .MuiSpeedDialIcon-iconOpen': {transform: 'none'}}}/>}>
      <SpeedDialAction icon={<Instagram/>}></SpeedDialAction>
      <SpeedDialAction icon={<Twitter/>}></SpeedDialAction>
      <SpeedDialAction icon={<Facebook/>}></SpeedDialAction>
    </SpeedDial>
  );
};
