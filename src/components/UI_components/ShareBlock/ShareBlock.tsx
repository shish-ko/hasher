import { Facebook, Share } from "@mui/icons-material"
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"

export const ShareBlock: React.FC =()=>{
  return (
    <SpeedDial ariaLabel="social_share"  direction="left" FabProps={{size: 'small', color: 'shareBlock', sx: {backgroundColor: 'white', boxShadow: 'none', '&:hover': {backgroundColor: 'white'}}}} icon={<SpeedDialIcon icon={<Share />}/>}>

      <SpeedDialAction icon={<Facebook/>}></SpeedDialAction>
      <SpeedDialAction icon={<Facebook/>}></SpeedDialAction>
      <SpeedDialAction icon={<Facebook/>}></SpeedDialAction>
    </SpeedDial>
  );
};
