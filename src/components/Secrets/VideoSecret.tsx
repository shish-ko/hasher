import { SERVER_URL } from "constants";
import React from "react";
import { ISecret } from "~interfaces/index";

export const VideoSecret: React.FC<Pick<Required<ISecret>, 'url'>> =({url}) => {
  return <video src={SERVER_URL+url} controls={true} style={{height: '200px'}}/>;
};
