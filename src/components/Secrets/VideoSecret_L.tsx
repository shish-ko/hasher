import { SERVER_URL } from "app_constants";
import { useEffect, useRef, useState } from "react";
import { ISecretProps } from "~interfaces/index";

export const VideoSecret_L: React.FC<ISecretProps> =({url}) => {
  const [isOversize, setIsOversize] = useState(false);
  const res = useRef<HTMLVideoElement>(null);
  useEffect(()=> {
    if(res.current) {
      const maxVideoHeight = document.getElementsByTagName('html')[0].clientHeight * .9;
      res.current.addEventListener('loadedmetadata', ()=> {if(res.current!.videoHeight > maxVideoHeight) setIsOversize(true);});
    }
  }, [res]);
  
  return <video ref={res} src={SERVER_URL+url} controls={true} className={`videoSecret__L ${isOversize && 'videoSecret__L_oversize'}`}/>;
};
