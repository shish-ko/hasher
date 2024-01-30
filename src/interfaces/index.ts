interface IAuthForm {
  email: string,
  password: string
}

interface ISecretForm {
  date: {$d: string},
  title: string,
  file: File[],
  description: string
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
  type: ESecretType,
  title: string,
  createdAt: string,
  url: string,
  userId: number;
  description: string;
}


type IFutureSecret = Omit<ISecret, 'url' | 'description'> 

interface ISecretInteractions {
  isLiked: boolean,
  subscription: boolean,
}

interface ISecretRes<T> {
  secret: T,
  interaction: ISecretInteractions
}

interface IUserFetchRes {
  availableSecrets: ISecret[],
  futureSecrets: IFutureSecret[]
}

interface ISecretProps {
  url: string;
}

type ISecretComponentProps = ISecret & {countdownHandler: ()=> void;}
export enum SERVER {
  SECRET = 'secret/',
  SECRET_LIKE='secret/like/',
  SECRET_SUBSCRIPTION = 'secret/subs/'
}

enum ESecretType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOC = 'DOC',
  PHOTO = 'PHOTO',
}

export type { IAuthForm, ITokenPayload, ISecretRes, ISecretForm, ISecretInteractions, IRouterParams, ISecret, ISecretComponentProps, ISecretProps, IFutureSecret, IUserFetchRes };
export { ESecretType};

