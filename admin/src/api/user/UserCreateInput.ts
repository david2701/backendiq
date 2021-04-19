export type UserCreateInput = {
  abone?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  men?: boolean | null;
  password: string;
  roles: Array<string>;
  ts?: boolean | null;
  username: string;
  women?: boolean | null;
};
