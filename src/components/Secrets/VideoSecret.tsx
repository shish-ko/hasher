import { SERVER_URL } from "app_constants";
import { ISecretProps } from "~interfaces/index";

export const VideoSecret: React.FC<ISecretProps> =({url}) => {
  return <video src={SERVER_URL+url} controls={true} style={{height: '200px'}}/>;
};
