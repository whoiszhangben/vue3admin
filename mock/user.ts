import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from './_util';

export function createFakeUserList() {
  return [
    {
      id: '1',
      username: 'admin',
      nickName: 'sssgoEasy Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      auths: [],
      modules: [],
      is_admin: 1,
      role_name: '管理员角色',
      mobile: 13000000000,
      last_login: '2021-11-11 12:00',
      role: 1, // 管理
    },
    {
      id: '2',
      username: 'test',
      nickName: 'test user',
      password: '123456',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      auths: [],
      modules: ['index', 'components', 'drag', 'menu', 'apis', 'roleRights', 'logs', 'operateLog', 'historyData', 'historyEvent', 'strategy', 'alertLevel', 'area'],
      is_admin: 0,
      role_name: '普通用户角色',
      mobile: 18000000000,
      last_login: '2021-11-11 12:12',
      role: 0, // 普通
    },
  ];
}

export default [
  // mock user login
  {
    url: '/api/user/login',
    timeout: 200,
    method: 'post',
    response: () => {
      let userResp = {
        expiresAt: 1670808403000,
        token: "fakeToken2",
        user: { "id": 2, "createdAt": "2022-11-11T09:02:18.996+08:00", "updatedAt": "2022-11-12T09:17:08.205+08:00", "deletedAt": null, "uuid": "8fc08734-2b13-4b55-a2d0-b6fc1f51a5e8", "userName": "admin", "nickName": "大坤", "sideMode": "dark", "headerImg": "https://qmplusimg.henrongyi.top/gva_header.jpg", "baseColor": "#fff", "activeColor": "#1890ff", "authorityId": 888, "authority": { "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-18T19:23:49.844+08:00", "DeletedAt": null, "authorityId": 888, "authorityName": "普通用户", "parentId": 0, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, "authorities": [{ "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-18T19:23:49.844+08:00", "DeletedAt": null, "authorityId": 888, "authorityName": "普通用户", "parentId": 0, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, { "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-11T09:02:19.011+08:00", "DeletedAt": null, "authorityId": 8881, "authorityName": "普通用户子角色", "parentId": 888, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, { "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-11T09:02:19.008+08:00", "DeletedAt": null, "authorityId": 9528, "authorityName": "测试角色", "parentId": 0, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }], "phone": "15013843457", "email": "251416704@qq.com", "enable": 1 }
        // token: "fakeToken1",
        // user: { "id": 1, "createdAt": "2022-11-11T09:02:18.996+08:00", "updatedAt": "2022-11-12T09:17:08.205+08:00", "deletedAt": null, "uuid": "8fc08734-2b13-4b55-a2d0-b6fc1f51a5e8", "userName": "admin", "nickName": "大坤", "sideMode": "dark", "headerImg": "https://qmplusimg.henrongyi.top/gva_header.jpg", "baseColor": "#fff", "activeColor": "#1890ff", "authorityId": 888, "authority": { "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-18T19:23:49.844+08:00", "DeletedAt": null, "authorityId": 888, "authorityName": "普通用户", "parentId": 0, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, "authorities": [{ "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-18T19:23:49.844+08:00", "DeletedAt": null, "authorityId": 888, "authorityName": "普通用户", "parentId": 0, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, { "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-11T09:02:19.011+08:00", "DeletedAt": null, "authorityId": 8881, "authorityName": "普通用户子角色", "parentId": 888, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, { "CreatedAt": "2022-11-11T09:02:18.875+08:00", "UpdatedAt": "2022-11-11T09:02:19.008+08:00", "DeletedAt": null, "authorityId": 9528, "authorityName": "测试角色", "parentId": 0, "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }], "phone": "15013843457", "email": "251416704@qq.com", "enable": 1 }
      }
      return resultSuccess(userResp);
    },
  },
  {
    url: '/api/user/permission',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/api/user/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/api/account/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
] as MockMethod[];
