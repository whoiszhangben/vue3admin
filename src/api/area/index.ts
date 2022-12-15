/**
 * @name 告警配置
 * @description 告警配置管理
 */

import { ResArea } from './model';
import { ResList } from '../common/model'
import { post } from '/@/utils/http';

enum URL {
    areaList = '/api/area/getAreaList',
}

const getAreaList = async () => post<ResList<ResArea>>({ url: URL.areaList });


export default { getAreaList };
