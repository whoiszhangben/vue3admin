import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_util';

export default [
  {
    url: '/api/menu/getMenuList',
    timeout: 200,
    method: 'post',
    response: () => {
      let menuResp = {
        "list": [
          {
            "id": 1,
            "createdAt": "2022-11-11T09:02:18.894+08:00",
            "updatedAt": "2022-11-11T14:16:35.094+08:00",
            "deletedAt": null,
            "parentId": "0",
            "routePath": "/admin/index",
            "routeName": "index",
            "isHidden": false,
            "filePath": "view/dashboard/index.vue",
            "sort": 1,
            "meta": {
              "activeName": "",
              "keepAlive": false,
              "defaultMenu": false,
              "title": "首页",
              "icon": "shouye",
              "closeTab": false
            },
            "authoritys": null,
            "children": null,
            "parameters": [],
            "menuBtn": []
          },
          {
            "id": 2,
            "createdAt": "2022-11-11T09:02:18.894+08:00",
            "updatedAt": "2022-11-11T14:16:35.094+08:00",
            "deletedAt": null,
            "parentId": "0",
            "routePath": "/admin/components",
            "routeName": "component",
            "isHidden": false,
            "filePath": "view/dashboard/index.vue",
            "sort": 1,
            "meta": {
              "activeName": "",
              "keepAlive": false,
              "defaultMenu": false,
              "title": "组件测试",
              "icon": "zujian",
              "closeTab": false
            },
            "authoritys": null,
            "children": null,
            "parameters": [],
            "menuBtn": []
          },
          {
            "id": 3,
            "createdAt": "2022-11-11T09:02:18.894+08:00",
            "updatedAt": "2022-11-11T14:16:35.094+08:00",
            "deletedAt": null,
            "parentId": "0",
            "routePath": "/admin/drag",
            "routeName": "drag",
            "isHidden": false,
            "filePath": "view/drag/index.vue",
            "sort": 1,
            "meta": {
              "activeName": "",
              "keepAlive": false,
              "defaultMenu": false,
              "title": "拖拉拽",
              "icon": "yidong",
              "closeTab": false
            },
            "authoritys": null,
            "children": null,
            "parameters": [],
            "menuBtn": []
          },
          {
            "id": 4,
            "createdAt": "2022-11-11T09:02:18.894+08:00",
            "updatedAt": "2022-11-11T14:16:35.094+08:00",
            "deletedAt": null,
            "parentId": "0",
            "routePath": "/admin/menu",
            "routeName": "menuManage",
            "isHidden": false,
            "filePath": "view/menu/index.vue",
            "sort": 1,
            "meta": {
              "activeName": "",
              "keepAlive": false,
              "defaultMenu": false,
              "title": "菜单管理",
              "icon": "caidan",
              "closeTab": false
            },
            "authoritys": null,
            "children": null,
            "parameters": [],
            "menuBtn": []
          },
          {
            "id": 5,
            "createdAt": "2022-11-11T09:02:18.894+08:00",
            "updatedAt": "2022-11-11T14:16:35.094+08:00",
            "deletedAt": null,
            "parentId": "0",
            "routePath": "/admin/roleRights",
            "routeName": "roleRights",
            "isHidden": false,
            "filePath": "views/roleRights/index.vue",
            "sort": 1,
            "meta": {
              "activeName": "",
              "keepAlive": false,
              "defaultMenu": false,
              "title": "角色权限",
              "icon": "jiaosequanxian",
              "closeTab": false
            },
            "authoritys": null,
            "children": null,
            "parameters": [],
            "menuBtn": []
          },
          {
            "id": 6,
            "createdAt": "2022-11-12T08:13:16.692+08:00",
            "updatedAt": "2022-11-12T09:07:07.351+08:00",
            "deletedAt": null,
            "parentId": "0",
            "routePath": "demo",
            "routeName": "demoShow",
            "isHidden": false,
            "filePath": "views/demos/index.vue",
            "sort": 3,
            "meta": {
              "activeName": "",
              "keepAlive": false,
              "defaultMenu": false,
              "title": "demo演示",
              "icon": "DEMO",
              "closeTab": false
            },
            "authoritys": null,
            "children": [{
              "id": 7,
              "createdAt": "2022-11-18T18:56:58.329+08:00",
              "updatedAt": "2022-11-23T17:07:37.833+08:00",
              "deletedAt": null,
              "parentId": "6",
              "routePath": "/admin/demo/about",
              "routeName": "about",
              "isHidden": true,
              "filePath": "view/demo/article/operate.vue",
              "sort": 0,
              "meta": {
                "activeName": "article",
                "keepAlive": false,
                "defaultMenu": false,
                "title": "文章操作",
                "icon": "aim",
                "closeTab": false
              },
              "authoritys": null,
              "children": null,
              "parameters": [{
                "id": 1,
                "createdAt": "2022-11-18T18:56:58.329+08:00",
                "updatedAt": "2022-11-18T18:56:58.329+08:00",
                "deletedAt": null,
                "SysBaseMenuID": 40,
                "type": "query",
                "key": "op",
                "value": "0"
              }],
              "menuBtn": [{
                "id": 1,
                "createdAt": "2022-11-23T17:07:37.833+08:00",
                "updatedAt": "2022-11-23T17:07:37.833+08:00",
                "deletedAt": null,
                "name": "测试按钮",
                "desc": "测试",
                "sysBaseMenuID": 40
              }]
            }]
          }],
        "total": 6,
        "page": 1,
        "pageSize": 10
      }
      return resultSuccess(menuResp);
    },
  }
] as MockMethod[];