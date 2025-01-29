/**
 * Login User情報
 */
export type LoginUser = {
  userId: string;
  userName: string;
  authority: string;
  firstLogin: string;
  enable: string;
  passwordChange: string;
};


export type SessionData = {
  user?: LoginUser
};