import React from "react";
import { ISecret } from "~interfaces/index";
import { AudioSecret } from "./AudioSecret";
import { VideoSecret } from "./VideoSecret";
import { DocSecret } from "./DocSecret";
import { PhotoSecret } from "./PhotoSecret";
import { Link } from "react-router-dom";

interface ISecretsList {
  secrets: ISecret[],
  expiredSecretHandler: () => void,
}

// TODO: change switch with getSecretComponent from helpers
export const SecretsList: React.FC<ISecretsList> = ({ secrets, expiredSecretHandler }) => {
  const availableSecrets = secrets.filter((secret) => secret.url);
  const futureSecrets = secrets.filter((secret) => !secret.url);
  return (
    <section className="secret-container">
      <div className="secrets secret-container__item">
        <h2 className="secrets__title">{availableSecrets.length ? 'Available secrets' : 'There is no available secrets'}</h2>
        <div className="secrets__body">
          {availableSecrets.map((secret) => {
            let typedSecret;
            switch (secret.type) {
              case 'AUDIO':
                typedSecret = <AudioSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;
              case 'VIDEO':
                typedSecret = <VideoSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;
              case 'DOC':
                typedSecret = <DocSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;
              case 'PHOTO':
                typedSecret = <PhotoSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;

              default:
                break;
            }
            return typedSecret;
          })}

        </div>

      </div>
      <div className="secrets secret-container__item">
        <h2 className="secrets__title">{futureSecrets.length ? 'Future secrets' : 'There is no future secrets'}</h2>
        <div className="secrets__body">
          {futureSecrets.map((secret) => {
            let typedSecret;
            switch (secret.type) {
              case 'AUDIO':
                typedSecret = <AudioSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;
              case 'VIDEO':
                typedSecret = <VideoSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;
              case 'DOC':
                typedSecret = <DocSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;
              case 'PHOTO':
                typedSecret = <PhotoSecret {...secret} countdownHandler={expiredSecretHandler} key={secret.createdAt}/>;
                break;

              default:
                break;
            }
            return typedSecret;
          })}

        </div>

      </div>
      <Link to={'/user/3'}>qweqwe</Link>
    </section >
  );
};
