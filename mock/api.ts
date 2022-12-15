import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_util';

export default [
    {
        url: '/api/api/getApiList',
        timeout: 200,
        method: 'post',
        response: () => {
            let menuResp = {
                "list": [{
                    "id": 18,
                    "apiName": "查询",
                    "apiURL": "/api/getApiById",
                    "description": "获取api详细信息",
                    "apiMenu": "apiManage",
                    "method": "POST"
                }, {
                    "id": 16,
                    "apiName": "查询列表",
                    "apiURL": "/api/getApiList",
                    "description": "获取api列表",
                    "apiMenu": "apiManage",
                    "method": "POST"
                }, {
                    "id": 15,
                    "apiName": "更新",
                    "apiURL": "/api/updateApi",
                    "description": "更新Api",
                    "apiMenu": "apiManage",
                    "method": "POST"
                }, {
                    "id": 19,
                    "apiName": "批量删除",
                    "apiURL": "/api/deleteApisByIds",
                    "description": "批量删除api",
                    "apiMenu": "apiManage",
                    "method": "DELETE"
                }, {
                    "id": 17,
                    "apiName": "查询所有Api",
                    "apiURL": "/api/getAllApis",
                    "description": "获取所有api",
                    "apiMenu": "apiManage",
                    "method": "POST"
                }, {
                    "id": 14,
                    "apiName": "删除api",
                    "apiURL": "/api/deleteApi",
                    "description": "删除Api",
                    "apiMenu": "apiManage",
                    "method": "POST"
                }, {
                    "id": 13,
                    "apiName": "新建",
                    "apiURL": "/api/createApi",
                    "description": "创建api",
                    "apiMenu": "apiManage",
                    "method": "POST"
                }],
                "total": 8,
                "page": 1,
                "pageSize": 10
            }
            return resultSuccess(menuResp);
        },
    }
] as MockMethod[];