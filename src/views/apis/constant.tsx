import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    dataIndex: 'apiName',
    width: 200,
  },
  {
    dataIndex: 'apiURL',
    width: 200,
  },
  {
    key: 'apiMenu',
    dataIndex: 'apiMenu',
    width: 100,
  },
  {
    dataIndex: 'method',
    width: 100,
  },
  {
    dataIndex: 'description',
    ellipsis: true,
  },
  {
    key: 'action',
    width: 250,
    fixed: 'right',
  }
];
