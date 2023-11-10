import React from "react";
import { ISecret } from "~interfaces/index";
import { AudioSecret } from "./AudioSecret";

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
            typedSecret = <AudioSecret {...secret} />;
            break;
          case 'DOC':
            typedSecret = <AudioSecret {...secret} />;
            break;
          case 'PHOTO':
            typedSecret = <AudioSecret {...secret} />;
            break;
        
          default:
            break;
        }
        return typedSecret;
      })}    
    </>
  );
};
