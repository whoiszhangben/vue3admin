import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    dataIndex: 'menuName',
    width: 200,
    customRender: ({ record }: any) => (
      <span>{record.meta ? `${record.meta.title}` : ''}</span>
    ),
  },
  {
    dataIndex: 'menuIcon',
    width: 100,
    customRender: ({ record }: any) => (
      <span>{record.meta ? `${record.meta.icon}` : ''}</span>
    ),
  },
  {
    dataIndex: 'routeName',
    width: 150
  },
  {
    dataIndex: 'routePath',
    width: 250,
  },
  {
    dataIndex: 'isHidden',
    width: 100,
    customRender: ({ record }: any) => (
      <span>{record.isHidden ? '是' : '否'}</span>
    ),
  },
  {
    dataIndex: 'sort',
    width: 80,
  },
  {
    dataIndex: 'filePath',
    ellipsis: true,
  },
  {
    key: 'action',
    width: 250,
    fixed: 'right',
  },
];
