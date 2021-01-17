import { ObjectLink } from "./main";

export type SystemInfo = {
  data: {
    version: string,
    api_version: string,
    php_version: string,
    os: string,
    driver: string,
  }
}

export type User = {
  readonly created_at: string,
  readonly updated_at: string,
  email: string,
  blocked: boolean,
  blocked_code: string | null, // TODO -- make enum
  role: string | null, // TODO -- make enum
  link: ObjectLink,
}

export type UserRead = {
  type: string,
  id: string,
  attributes: User,
}

export type UserSingle = {
  data: UserRead
}

export interface AboutWrapper {
  getSystemInformation(): Promise<SystemInfo>;
  getAuthenticatedUser(): Promise<UserSingle>;
}
