import { DataNode } from 'ant-design-vue/lib/tree';
import { defineStore } from 'pinia';
import fetchApi from '/@/api/area';
import { Array2Tree } from '/@/utils/util'

interface areaState {
    areaList: any[],
    selectOrg: any
}


export const useAreaStore = defineStore("app-area", {
    state: (): areaState => {
        return {
            areaList: [],
            selectOrg: {}
        }
    },
    getters: {
        getOrgTree(): DataNode[] {
            let areaLst = this.areaList;
            return Array2Tree(areaLst, null)
        }
    },
    actions: {
        setSelectOrg(org: any) {
            this.selectOrg = org;
        },
        setAreaList(areaList: any) {
            this.areaList = areaList;
        },
        async getAreaList() {
            const res = await fetchApi.getAreaList()
            if (res && Array.isArray(res.list)) {
                this.setAreaList(res.list);
                return res.list;
            }
            return null;
        }
    }
})