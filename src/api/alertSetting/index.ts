/**
 * @name 告警配置
 * @description 告警配置管理
 */

import { ResAlertLevel } from './model';
import { ResList } from '../common/model'
import { post } from '/@/utils/http';

enum URL {
    alertLevel = '/api/alertSetting/getAlertLevel',
}

const alertLevelList = async () => post<ResList<ResAlertLevel>>({ url: URL.alertLevel });


export default { alertLevelList };
