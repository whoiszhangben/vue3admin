import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_util';

export default [
  {
    url: '/api/alertSetting/getAlertLevel',
    timeout: 200,
    method: 'post',
    response: () => {
      let alertLevelResp = {
        "list": [
          {
            id: 1,
            alertLevelName: '紧急告警',
            alertLevelColor: '#ff0000',
          },
          {
            id: 2,
            alertLevelName: '重要告警',
            alertLevelColor: '#FFBB0B',
          },
          {
            id: 3,
            alertLevelName: '次要告警',
            alertLevelColor: '#EAD602',
          },
          {
            id: 4,
            alertLevelName: '提示告警',
            alertLevelColor: '#108EE9',
          },
          {
            id: 5,
            alertLevelName: '告警恢复',
            alertLevelColor: '#00CC5E',
          }
        ],
        "total": 5,
        "page": 1,
        "pageSize": 10
      }
      return resultSuccess(alertLevelResp);
    },
  }
] as MockMethod[];