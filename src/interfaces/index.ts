interface IAuthForm {
  email: string,
  password: string
}

interface ISecretForm {
  date: string,
  // hours: string,
  // minutes: string,
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
type TSecretType = 'AUDIO' | 'VIDEO' | 'DOC' | 'PHOTO'

export type { IAuthForm, ITokenPayload, ISecretForm, IRouterParams, ISecret, TSecretType, ISecretComponentProps };
