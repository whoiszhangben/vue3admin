import { ColumnProps } from 'ant-design-vue/es/table';

export const columns: ColumnProps[] = [
    {
        title: '告警级别名称',
        dataIndex: 'alertLevelName',
        width: 200,
    },
    {
        title: '告警级别颜色',
        dataIndex: 'alertLevelColor',
        width: 200,
        align: 'center'
    },
    {
        title: '预览',
        dataIndex: 'alertLevelDesc',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'action',
        width: 200,
        // slots: { customRender: 'action' },
    },
];
