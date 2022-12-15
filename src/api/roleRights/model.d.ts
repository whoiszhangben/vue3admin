export interface RoleItem {
    roleId: number,
    roleName: string
}

export interface RoleList {
    roleList: RoleItem[]
}

export interface RoleRightsAction {
    apiId: number,
    apiUrl: string,
    apiName: string,
    isChecked: boolean
}

export interface RoleRights {
    menuId: number,
    menuName: string,
    isChecked: boolean,
    actions: RoleRightsAction[],
    children: RoleRights[]
}