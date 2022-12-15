import { defineStore } from 'pinia';
import fetchApi from '/@/api/roleRights';
import { RoleItem } from '/@/api/roleRights/model'

interface RoleState {
    roleList: RoleItem[]
}

export const useRoleStore = defineStore('app-role', {
    state: (): RoleState => {
        return {
            roleList: []
        }
    },
    getters: {

    },
    actions: {
        setRoleList(roleList) {
            this.roleList = roleList;
        },
        async getRoleList() {
            let dict: any[] = []
            const res = await fetchApi.roleList()
            if (Array.isArray(res)) {
                this.setRoleList(res)
                return res;
            }
            return dict
        }
    }
})