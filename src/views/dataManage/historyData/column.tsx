import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
  {
    title: '编号',
    dataIndex: 'index',
    width: 80,
  },
  {
    title: '所属区域',
    dataIndex: 'area',
    width: 150,
  },
  {
    title: '所属代理',
    dataIndex: 'agent',
    width: 150,
  },
  {
    title: '所属设备',
    dataIndex: 'device',
    width: 150,
  },
  {
    title: '指标',
    dataIndex: 'point',
    width: 150,
  },
  {
    title: '指标值',
    dataIndex: 'pointVal',
    width: 100,
  },
  {
    title: '产生时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    fixed: 'right'
    // slots: { customRender: 'action' },
  },
];
