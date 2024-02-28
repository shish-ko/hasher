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
  name?: string,
  id: number,
  userPic?: string,
  emailSubs: boolean,
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
  ACCOUNT_NAME = 'account/name/',
  ACCOUNT_USERPIC = 'account/userpic',
  ACCOUNT_PASSWORD = 'account/password/'
}

interface IAccountInfo {
  name?: string,
  userPic?: string,
  emailSubs?: boolean,
}

enum ESecretType {
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  DOC = 'DOC',
  PHOTO = 'PHOTO',
}

export type { TSecretWithStats, IAuthForm, ITokenPayload, ISecretForm, IRouterParams, ISecret, ISecretComponentProps, ISecretProps, IFutureSecret, IUserSecrets, IAccountInfo };
export { ESecretType };

