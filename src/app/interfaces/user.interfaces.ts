export interface User {
  uuid?: string;
  nickname: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  createAt?: string;
  updateAt?: string;
}
