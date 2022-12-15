/**
 * @name menu
 * @description 角色管理
 */

import { RoleList, RoleRights } from './model';
import { get, post } from '/@/utils/http';

enum URL {
    roleAdd = '/api/role/add',
    roleUpdate = '/api/role/edit',
    roleList = '/api/role/getRoleList',
    roleDelete = '/api/role/delete',
    getRoleRightsById = '/api/role/getRoleRightsById',
}

const roleList = async () => get<RoleList>({ url: URL.roleList });
const getRoleRightsById = async (data: any) => post<RoleRights>({ url: URL.getRoleRightsById, data });
export default { roleList, getRoleRightsById };

