import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from './_util';

export default [
    {
        url: '/api/logs/historyDataList',
        timeout: 200,
        method: 'post',
        response: () => {
            let historyDataResp = {
                "list": [
                    {
                        index: 1,
                        area: '深圳基地',
                        agent: '代理1',
                        device: '云主机Linux',
                        point: 'cpu利用率',
                        pointVal: '33.85%',
                        createTime: '2022/12/13 14:34:50'
                    },
                    {
                        index: 2,
                        area: '广州基地',
                        agent: '代理2',
                        device: '云主机Linux2',
                        point: 'cpu利用率',
                        pointVal: '33.85%',
                        createTime: '2022/12/13 14:34:50'
                    },
                    {
                        index: 3,
                        area: '佛山基地',
                        agent: '代理3',
                        device: '云主机Linux3',
                        point: 'cpu利用率',
                        pointVal: '33.85%',
                        createTime: '2022/12/13 14:34:50'
                    },
                    {
                        index: 4,
                        area: '梅州基地',
                        agent: '代理4',
                        device: '云主机Linux',
                        point: 'cpu利用率',
                        pointVal: '33.85%',
                        createTime: '2022/12/13 14:34:50'
                    },
                    {
                        index: 5,
                        area: '珠海基地',
                        agent: '代理5',
                        device: '云主机Linux',
                        point: 'cpu利用率',
                        pointVal: '33.85%',
                        createTime: '2022/12/13 14:34:50'
                    },
                    {
                        index: 6,
                        area: '肇庆基地',
                        agent: '代理1',
                        device: '云主机Linux',
                        point: 'cpu利用率',
                        pointVal: '33.85%',
                        createTime: '2022/12/13 14:34:50'
                    }
                ],
                "total": 6,
                "page": 1,
                "pageSize": 10
            }
            return resultSuccess(historyDataResp);
        },
    }
] as MockMethod[];