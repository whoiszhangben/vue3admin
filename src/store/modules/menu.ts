import { defineStore } from 'pinia';
import fetchApi from '/@/api/menu';
import { ResMenu } from '/@/api/menu/model';

interface MenuState {
    menuList: any[],
    menuTreeData: any[]
}

export const useMenuStore = defineStore('app-menu', {
    state: (): MenuState => {
        return {
            menuList: [],
            menuTreeData: []
        }
    },
    getters: {

    },
    actions: {
        setMenuList(menuLst) {
            this.menuList = menuLst;
        },
        setMenuTreeData(menuData) {
            this.menuTreeData = menuData;
        },
        async getMenuList() {
            const dict: any[] = []
            const res = await fetchApi.menuList({
                page: 1,
                pageSize: 10000
            })
            if (res && Array.isArray(res.list)) {
                res.list.forEach((item: ResMenu) => {
                    let mapItem = {
                        title: item.routeName,
                        value: item.id
                    }
                    let children: any[] = []
                    if (Array.isArray(item.children)) {
                        item.children.forEach((sub: ResMenu) => {
                            children.push({
                                title: sub.routeName,
                                value: sub.id
                            })
                        })
                    }
                    if (children.length) {
                        mapItem['children'] = children;
                    }
                    dict.push(mapItem)
                })
                this.setMenuTreeData(dict)
            }
            return dict
        },
    }
})

