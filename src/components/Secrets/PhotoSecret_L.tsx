import { ISecretProps } from "~interfaces/index";

export const PhotoSecret_L: React.FC<ISecretProps> = ({url})=>{
  const img = new Image();
  img.src = url;
  const isHorizontal = img.naturalWidth>=img.naturalHeight;
  return (
    <img className={isHorizontal ? 'photoSecret__L_horiz' : 'photoSecret__L_vertical'} src={url}/>
  );
};
