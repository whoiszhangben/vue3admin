import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_util';

export default [
    {
        url: '/api/role/getRoleList',
        timeout: 200,
        method: 'get',
        response: () => {
            let roleResp = [
                {
                    roleId: 1,
                    roleName: '管理员'
                },
                {
                    roleId: 2,
                    roleName: '运维'
                },
                {
                    roleId: 3,
                    roleName: '普通用户'
                },
            ];
            return resultSuccess(roleResp)
        }
    },
    {
        url: '/api/role/getRoleRightsById',
        timeout: 200,
        method: 'post',
        response: () => {
            let roleRightsResp = [
                {
                    menuId: 1,
                    menuName: '首页',
                    isChecked: true,
                    actions: [],
                    children: [
                    ]
                },
                {
                    menuId: 2,
                    menuName: 'Api管理',
                    isChecked: false,
                    actions: [
                        {
                            apiId: 3,
                            apiName: '查询',
                            apiUrl: '/api/getApiById',
                            isChecked: false,
                        },
                        {
                            apiId: 4,
                            apiName: '更新',
                            apiUrl: '/api/updateApi',
                            isChecked: false,
                        },
                        {
                            apiId: 5,
                            apiName: '批量删除',
                            apiUrl: '/api/deleteApisById',
                            isChecked: false,
                        }
                    ],
                },
                {
                    menuId: 6,
                    menuName: 'demo管理',
                    isChecked: true,
                    actions: [],
                    children: [
                        {
                            menuId: 7,
                            menuName: '关于',
                            isChecked: true,
                            children: [],
                            actions: [
                                {
                                    apiId: 7,
                                    apiName: '增加',
                                    apiUrl: '/api/demo/add',
                                    isChecked: true,
                                },
                                {
                                    apiId: 8,
                                    apiName: '删除',
                                    apiUrl: '/api/demo/demo',
                                    isChecked: false,
                                },
                                {
                                    apiId: 9,
                                    apiName: '查询',
                                    apiUrl: '/api/demo/get',
                                    isChecked: false,
                                },
                                {
                                    apiId: 10,
                                    apiName: '更新',
                                    apiUrl: '/api/demo/update',
                                    isChecked: false,
                                }
                            ]
                        }
                    ]
                }
            ];
            return resultSuccess(roleRightsResp);
        }
    }
] as MockMethod[]