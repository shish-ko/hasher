import React from "react";
import { ISecret } from "~interfaces/index";
import { AudioSecret } from "./AvailableSecret";

interface ISecretsList {
  secrets: ISecret[],
  expiredSecretHandler: () => void,
}

export const SecretsList: React.FC<ISecretsList> = ({ secrets, expiredSecretHandler }) => {
  const availableSecrets = secrets.filter((secret) => secret.url) as Required<ISecret>[];
  const futureSecrets = secrets.filter((secret) => !secret.url);
  return (
    <section className="secret-container">
      <div className="secrets secret-container__item">
        <h2 className="secrets__title">{availableSecrets.length ? 'Available secrets' : 'There is no available secrets'}</h2>
        <div className="secrets__body">
          {availableSecrets.map((secret) => {
            return <AudioSecret {...secret}/>;
          })}
        </div>
      </div>
      <div className="secrets secret-container__item">
        <h2 className="secrets__title">{futureSecrets.length ? 'Future secrets' : 'There is no future secrets'}</h2>
        <div className="secrets__body">
          {/* {futureSecrets.map((secret) => {
            return getSecretComponent(secret, expiredSecretHandler);
          })} */}
        </div>
      </div>
    </section >
  );
};
