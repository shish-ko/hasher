import React from "react";
import { ISecret } from "~interfaces/index";
import { AudioSecret } from "./AudioSecret";
import { VideoSecret } from "./VideoSecret";
import { DocSecret } from "./DocSecret";
import { PhotoSecret } from "./PhotoSecret";

interface ISecretsList {
  secrets: ISecret[],
}
export const SecretsList: React.FC<ISecretsList> = ({secrets}) => {
  return (
    <>
      {secrets.map((secret) => {
        let typedSecret;
        switch (secret.type) {
          case 'AUDIO':
            typedSecret = <AudioSecret {...secret} />;
            break;
          case 'VIDEO':
            typedSecret = <VideoSecret {...secret} />;
            break;
          case 'DOC':
            typedSecret = <DocSecret {...secret} />;
            break;
          case 'PHOTO':
            typedSecret = <PhotoSecret {...secret} />;
            break;
        
          default:
            break;
        }
        return typedSecret;
      })}    
    </>
  );
};
