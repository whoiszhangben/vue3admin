import { ResList } from '../common/model'
export interface ReqMenu {
  id: number;
  account?: string;
  password?: string;
}

export interface ReqParams {
  page: number,
  pageSize: number
}

export interface MenuMeta {
  activeName: '';
  keepAlive: boolean;
  defaultMenu: boolean;
  titleKey: string;
  icon: string;
  closeTab: boolean
}

export interface ResMenu {
  id?: number;
  createdAt: string;
  updatedAt: string;
  deleteAt?: string | null;
  parentId?: Number;
  routePath: string;
  routeName: string;
  isHidden: boolean;
  filePath: string;
  sort: number;
  meta: MenuMeta;
  authorities: any[];
  children: ResMenu[] | null,
  parameters: any[],
  menuBtn: any[]
}

export type ResPermission = { auths: Array<string> };
