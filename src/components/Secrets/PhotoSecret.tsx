import { Box } from "@mui/material";
import { SERVER_URL } from "app_constants";
import { useEffect, useState } from "react";
import { ISecretProps } from "~interfaces/index";

export const PhotoSecret: React.FC<ISecretProps> = ({url}) => {
  const [isImageOversize, setIsImageOversize] = useState(false);
  useEffect(()=> {
    const img = new Image();
    img.addEventListener('load', ()=>{if(img.height > 200) setIsImageOversize(true);});
    img.src = SERVER_URL + url;
  }, [url]);
  return <Box sx={{position: 'relative', background: `center no-repeat url(${SERVER_URL + url})`, backgroundSize: `${isImageOversize ? 'contain' : 'auto'}`, minHeight: '200px'}}/>;
};
