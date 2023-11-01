interface IAuthForm {
  email: string,
  password: string
}

interface ISecretForm {
  date: string,
  time: string,
  file: File,
}

interface ITokenPayload {
  exp: number,
  name: string,
  id: number,
}

export type { IAuthForm, ITokenPayload, ISecretForm };
