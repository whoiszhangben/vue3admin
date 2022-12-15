/**
 * @name AuthEnum
 * @description 权限，配合指令 v-auth 使用
 * @Example v-auth="AuthEnum.user_create"
 */

export enum AuthEnum {
  /**
   * 用户
   */
  // 新增用户
  user_create = '/api/user/create',
  // 编辑用户
  user_update = '/api/user/update',
  // 删除用户
  user_delete = '/api/user/delete',

  /**
   * 角色
   */
  // 新增角色
  role_create = '/api/role/create',
  // 修改角色
  role_update = '/api/role/update',
  // 删除角色
  role_delete = '/api/role/delete',
}
