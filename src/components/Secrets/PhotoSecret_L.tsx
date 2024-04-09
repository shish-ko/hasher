import { SERVER_URL } from "app_constants";
import { useEffect, useState } from "react";
import { ISecretProps } from "~interfaces/index";

export const PhotoSecret_L: React.FC<ISecretProps> = ({url})=>{
  const [isHorizontal, setIsHorizontal] = useState(true);
  useEffect(()=> {
    const img = new Image();
    img.addEventListener('load', ()=>{if(img.naturalWidth<img.naturalHeight) setIsHorizontal(false);});
    img.src = SERVER_URL + url;
  }, [url]);
  return (
    <img className={isHorizontal ? 'photoSecret__L_horiz' : 'photoSecret__L_vertical'} src={SERVER_URL + url}/>
  );
};
