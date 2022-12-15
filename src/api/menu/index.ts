/**
 * @name menu
 * @description 菜单管理
 */

import { ReqMenu, ReqParams, ResMenu } from './model';
import { ResList } from '../common/model'
import { post } from '/@/utils/http';

enum URL {
  menuAdd = '/api/menu/add',
  menuUpdate = '/api/menu/edit',
  menuList = '/api/menu/getMenuList',
  menuDelete = '/api/menu/delete'
}

const menuList = async (data: ReqParams) => post<ResList<ResMenu>>({ url: URL.menuList, data });

const menuUpdate = async (data: ReqMenu) => post<any>({ url: URL.menuUpdate, data });

export default { menuList, menuUpdate };
