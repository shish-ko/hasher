interface IAuthForm {
  email: string,
  password: string
}

interface ITokenPayload {
  exp: number
  name: string
  id: number,
}

export type { IAuthForm, ITokenPayload };
