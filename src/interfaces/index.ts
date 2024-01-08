interface IAuthForm {
  email: string,
  password: string
}

interface ISecretForm {
  date: string,
  title: string,
  file: File[],
}

interface ITokenPayload {
  exp: number,
  name: string,
  id: number,
}
type IRouterParams = 'userId';

interface ISecret {
  id: string,
  availableAt: string,
  type: TSecretType,
  title: string,
  createdAt: string,
  url?: string,
}

type ISecretComponentProps = ISecret & {countdownHandler: ()=> void;}
export enum SERVER {
  SECRET = 'secret/',
  
}

type TSecretType = ESecretType;

enum ESecretType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOC = 'DOC',
  PHOTO = 'PHOTO',
}

export type { IAuthForm, ITokenPayload, ISecretForm, IRouterParams, ISecret, TSecretType, ISecretComponentProps };
export { ESecretType};

