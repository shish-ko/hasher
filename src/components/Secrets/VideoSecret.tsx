import { SERVER_URL } from "app_constants";
import { ISecretProps } from "~interfaces/index";

export const VideoSecret: React.FC<ISecretProps> =({url, large}) => {
  return <video src={SERVER_URL+url} controls={true} className={`mediaSecret__video mediaSecret__video_${large ? 'L' : 'S'}`}/>;
};
