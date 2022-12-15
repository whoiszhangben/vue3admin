/**
 * @name menu
 * @description api管理
 */

import { ResApi } from './model';
import { post } from '/@/utils/http';

enum URL {
    apiList = '/api/api/getApiList',
}

const apiList = async () => post<ResApi>({ url: URL.apiList });


export default { apiList };
