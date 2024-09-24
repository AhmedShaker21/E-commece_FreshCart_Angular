export interface UserDataLogin {
  email: string,
  password: string,
}
export interface UserDataSignup extends UserDataLogin{
  name: string,
  phone: string,
  rePassword: string
}
