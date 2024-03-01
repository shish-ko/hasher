interface IAuthForm {
  email: string,
  password: string
}

interface ISecretForm {
  date: { $d: string },
  title: string,
  file: File[],
  description: string
}

interface ITokenPayload {
  exp: number,
  id: number,
}

interface IToken {
  token: string,
}

interface IAccountInfo {
  id: number,
  emailSubs: boolean,
  userPic: string | null,
  name: string,  
}

type IRouterParams = 'userId';

interface ISecret {
  id: string,
  availableAt: string,
  type: ESecretType,
  title: string,
  views: number,
  createdAt: string,
  url: string,
  userId: number;
  description: string;
}

interface IFutureSecret extends Omit<ISecret, 'url' | 'description'> {
  url: null;
  description: null
}

interface ISecretStats {
  likesNum: number;
  subscribersNum: number;
  isLiked: boolean;
  isSubscribed: boolean
}

type TSecretWithStats<T> = T & { stats: ISecretStats }

interface IUserSecrets {
  availableSecrets: ISecret[],
  futureSecrets: IFutureSecret[]
}

interface ISecretProps {
  url: string;
}

type ISecretComponentProps = ISecret & { countdownHandler: () => void; }
export enum SERVER {
  USER = 'user/',
  SECRET = 'secret/',
  SECRET_LIKE = 'secret/like/',
  SECRET_SUBSCRIPTION = 'secret/subs/',
  ACCOUNT_INFO = 'account/info/',
  ACCOUNT_NAME = 'account/username/',
  ACCOUNT_USERPIC = 'account/userpic',
  ACCOUNT_PASSWORD = 'account/password/'
}

enum ESecretType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOC = 'DOC',
  PHOTO = 'PHOTO',
}

export type { IToken, TSecretWithStats, IAuthForm, ITokenPayload, ISecretForm, IRouterParams, ISecret, ISecretComponentProps, ISecretProps, IFutureSecret, IUserSecrets, IAccountInfo };
export { ESecretType };

