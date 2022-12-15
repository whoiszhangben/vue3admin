import { defineStore } from 'pinia';
import fetchApi from '/@/api/alertSetting'

interface alertSettingState {
    alertLevelList: any[]
}


export const useAlertSettingStore = defineStore("app-alertSetting", {
    state: (): alertSettingState => {
        return {
            alertLevelList: []
        }
    },
    getters: {

    },
    actions: {
        setAlertLevelList(levelList: any) {
            this.alertLevelList = levelList;
        },
        async getAlertLevelList() {
            const res = await fetchApi.alertLevelList()
            if (res && Array.isArray(res.list)) {
                this.setAlertLevelList(res.list);
                return res.list;
            }
            return null;
        }
    }
})