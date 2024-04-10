import { Stack } from "@mui/material";
import { SERVER_URL } from "app_constants";
import { ISecretProps } from "~interfaces/index";

export const PhotoSecret: React.FC<ISecretProps> = ({url, large})=>{
  return (
    <Stack alignContent={'center'} height={'100%'} flexWrap={'wrap'} justifyContent={'center'}>
      <img className={`mediaSecret__photo mediaSecret__photo_${large ? 'L' : 'S'}`} src={SERVER_URL + url}/>
    </Stack>
  );
};
