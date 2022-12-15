export interface ReqParams {
  mobile: 'string';
  password: 'string';
}

export interface ReqAuth {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

export interface Authority {
  createdAt: string,
  updatedAt: string,
  deletedAt: string,
  authorityId: number,
  authorityName: string,
  parentId: number | null,
  dataAuthorityId: number | null,
  children: any[] | null,
  menus: any[] | null,
  defaultRouter: string
}

export interface User {
  id: Number,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  uuid: string,
  userName: string,
  nickName: string,
  sideMode: string,
  headerImg: string,
  baseColor: string,
  activeColor: string,
  authorityId: number,
  authority: Authority,
  authorities: Authority[],
  phone: string,
  email: string,
  enable: number
}

export interface ResResult {
  expiresAt: number,
  token: string,
  user: User
}
