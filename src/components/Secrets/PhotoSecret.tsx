import { Box } from "@mui/material";
import { SERVER_URL } from "app_constants";
import { ISecretProps } from "~interfaces/index";

export const PhotoSecret: React.FC<ISecretProps> = ({url}) => {
  const img = new Image();
  img.src = SERVER_URL + url;
  const isImageOversize = img.height > 200;
  return <Box sx={{position: 'relative', background: `center no-repeat url(${SERVER_URL + url})`, backgroundSize: `${isImageOversize ? 'contain' : 'auto'}`, minHeight: '200px'}}/>;
};
