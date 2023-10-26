interface IAuthForm {
  email: string,
  password: string
}

interface ITokenPayload {
  exp: number
  email: string
}

export type { IAuthForm, ITokenPayload };
