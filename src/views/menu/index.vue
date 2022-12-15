<template>
  <div class="menu-conatiner">
    <Table
      ref="ELRef"
      :url="fetchApi.menuList"
      :columns="columns"
      :items="tableFilterItems"
      :button="tableFilterButton"
      :actions="tableActions"
      :model="tableFilterModel"
      :scroll="{ x: 1300, y: 1000 }"
    />
    <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit" :width="1000">
      <a-form
        ref="FormRef"
        :model="formModel"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item :label="$t('routeName') + ':'" name="routeName">
              <a-input v-model:value="formModel.routeName" :placeholder="$t('routeNamePlaceholder')" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :label="$t('routePath') + ':'" name="routePath">
              <a-input v-model:value="formModel.routePath" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :label="$t('isHidden') + ':'" name="isHidden">
              <a-select v-model:value="formModel.isHidden">
                <a-select-option :value="0">{{$t('no')}}</a-select-option>
                <a-select-option :value="1">{{$t('yes')}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item :label="$t('menuName') + ':'" name="menuName">
              <a-input v-model:value="formModel.menuName" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :label="$t('parentId') + ':'" name="parentId">
              <a-select v-model:value="formModel.parentId">
                <a-select-option :value="0">{{$t('no')}}</a-select-option>
                <a-select-option :value="1">{{$t('yes')}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :label="$t('menuIcon') + ':'" name="menuIcon">
              <a-select
                v-model:value="formModel.menuIcon"
                style="width:100%" 
                allowClear 
                showSearch
                placeholder="请选择"
              >
                <a-select-option
                v-for="item in iconList"
                  :key="item.key"
                  class="select__option_item"
                  :label="item.key"
                  :value="item.key"
                >
                <span>
                  <Icon :type='item.key' />
                </span>
                <span style="text-align: left">{{ item.key }}</span>
              </a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item :label="$t('sort') + ':'" name="sort">
              <a-input v-model:value="formModel.sort" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-button type="primary" @click="addNewParam">{{$t("addMenuParam")}}</a-button>
            <a-table class="marTB8" bordered :columns="columnsParam" :data-source="dataParam" :pagination="false">
              <template #headerCell="{ column }">
                {{$t(column.key)}} 
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'menuParamType'">
                  <div>
                    <a-select v-model:value="record.menuParamType" style="width: 100%">
                      <a-select-option value="query">query</a-select-option>
                      <a-select-option value="params">params</a-select-option>
                    </a-select>
                  </div>
                </template>
                <template v-if="column.key === 'menuParamKey'">
                  <div>
                    <a-input
                      v-model:value="record.menuParamKey"
                      style="margin: -5px 0"
                      @change="e => handleChange(e.target.value, record.key, column)"
                    />
                  </div>
                </template>
                <template v-if="column.key === 'menuParamValue'">
                  <div>
                    <a-input
                      style="margin: -5px 0"
                      v-model:value="record.menuParamValue"
                      @change="e => handleChange(e.target.value, record.key, column)"
                    />
                  </div>
                </template>
                <template v-if="column.key === 'action'">
                  <a-button type="primary" danger small @click="deleteParam(record)">{{$t('delete')}}</a-button>
                </template>
              </template>
          </a-table>
          </a-col>
        </a-row>
        <!-- <a-row :gutter="24">
          <a-col :span="24">
            <a-button type="primary" @click="addRightsBtn">{{$t("addRightsBtn")}}</a-button>
            <a-table class="marTB8" bordered :columns="columnsRightsBtn" :data-source="dataRightsBtn" :pagination="false">
              <template #headerCell="{ column }">
                {{$t(column.key)}} 
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'buttonName'">
                  <div>
                    <a-input
                      v-model:value="record.buttonName"
                      style="margin: -5px 0"
                      @change="e => handleChange(e.target.value, record.key, column)"
                    />
                  </div>
                </template>
                <template v-if="column.key === 'remark'">
                  <div>
                    <a-input
                      v-model:value="record.remark"
                      style="margin: -5px 0"
                      @change="e => handleChange(e.target.value, record.key, column)"
                    />
                  </div>
                </template>
                <template v-if="column.key === 'action'">
                  <a-button type="primary" danger small @click="deleteRightsBtn(record)">{{$t('delete')}}</a-button>
                </template>
              </template>
          </a-table>
          </a-col>
        </a-row> -->
      </a-form>
    </Modal>
  </div>
</template>
<script setup lang="ts">
  import type { TableColumnsType } from 'ant-design-vue';
  import { columns } from './column';
  import fetchApi from '/@/api/menu';
  import { useMessage } from '/@/hooks/useMessage';
  import { validatePhone } from '/@/utils/validate';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import Icon from '/@/components/Icon/index.vue';
  import i18n from '../../locale'
  import { useI18n } from 'vue-i18n';

  const mockReq = (params?: any): Promise<Boolean> =>
    new Promise((resolve) => setTimeout(() => resolve(params ? !!params : true), 500));

  const { createMessage } = useMessage();
  const FormRef = ref<FormInstance>();
  const ELRef = ref<{ refresh: () => void }>();
  const refresh = () => ELRef.value?.refresh(); // 参数不变，直接更新
  // const run = (args) => ELRef.value.run(args); // Table提供run方法接受参数，做到更自由控制数据更新

  const labelCol = { style: { width: '110px' } };
  const wrapperCol = { span: 17 };
  const { t } = useI18n()

  const iconList = computed(() => [
  {
    'key': 'shouye',
    'label': 'shouye',
  },
  {
    'key': 'zujian',
    'label': 'zujian',
  },
  {
    'key': 'yidong',
    'label': 'yidong',
  },
  {
    'key': 'caidan',
    'label': 'caidan',
  },
  {
    'key': 'jiaosequanxian',
    'label': 'jiaosequanxian',
  },
  {
    'key': 'DEMO',
    'label': 'DEMO',
  }
  ]);

  const columnsParam: TableColumnsType = [
    {
      key: 'menuParamType',
      dataIndex: 'menuParamType',
      width: 200,
    },
    {
      key: 'menuParamKey',
      dataIndex: 'menuParamKey',
      width: 200,
    },
    {
      key: 'menuParamValue',
      dataIndex: 'menuParamValue',
    },
    {
      key: 'action',
      width: 250,
      fixed: 'right',
    }
  ];

  // const columnsRightsBtn: TableColumnsType = [
  //   {
  //     key: 'buttonName',
  //     dataIndex: 'buttonName',
  //     width: 200,
  //   },
  //   {
  //     key: 'remark',
  //     dataIndex: 'remark',
  //     width: 200,
  //   },
  //   {
  //     key: 'action',
  //     width: 250,
  //     fixed: 'right',
  //   }
  // ]
  // modal
  const modalState = reactive({
    loading: false,
    visible: false,
    title: t('addRootMenu'),
    okText: t('Add'),
  });

  // form
  const rules: Record<string, Rule[]> = {
    mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
    role_id: [
      {
        required: true,
        trigger: 'change',
        validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请选择角色')),
      },
    ],
  };
  const formModel = ref({
    menuName: '',
    routeName: '',
    routePath: '',
    parentId: 0,
    isHidden: 0,
    menuIcon: '',
    sort: ''
  });

  const tableActions = reactive([
    {
      label: 'addSubMenu',
      onClick: async (row) => {
        modalState.title = 'addSubMenu';
        modalState.okText = 'add';
        modalState.visible = true;
        formModel.value = row;
      }
    },
    {
      label: 'edit',
      // auth: AuthEnum.user_update,
      onClick: async (row) => {
        modalState.title = 'edit';
        modalState.okText = i18n.global.t('edit');
        modalState.visible = true;
        formModel.value = row;
      },
    },
    {
      label: 'delete',
      popConfirm: {
        title: t('ensureDelete'),
        onConfirm: async (row) => {
          console.log('row', row);
          const res = await mockReq();
          if (res) {
            createMessage.success(t('susscessDelete'));
            refresh();
          }
        },
      },
    },
  ]);

  const handleCancel = () => {
    modalState.visible = false;
    FormRef.value?.resetFields();
  };

  const handleSubmit = () => {
    FormRef.value
      ?.validate()
      .then(async () => {
        modalState.loading = true;
        // const req = modalState.title === '新增用户' ? store.fetchCreate : store.fetchUpdate;
        const res = await mockReq(formModel.value);
        modalState.loading = false;
        if (res) {
          createMessage.success(`${modalState.title === '新增用户' ? '新增' : '修改'}用户成功`);
          handleCancel();
          console.log('ELRef.value', ELRef.value);
          refresh();
        }
      })
      .catch(console.log);
  };

  // filter
  const tableFilterModel = reactive({});
  const tableFilterButton = reactive({
    type: 'primary',
    label: 'addRootMenu',
    // auth: AuthEnum.user_create,
    onClick: () => {
      modalState.title = t("addRootMenu");
      modalState.okText = t("add");
      modalState.visible = true;
    },
  });

  const tableFilterItems = computed(() => []);

  let dataParam = ref<any[]>([

  ])

  let dataRightsBtn = ref<any[]>([])

  const addNewParam = () => {
    dataParam.value.push({
      menuParamType: '',
      menuParamKey: '',
      menuParamValue: '',
      action: ''

    })
  }

  const addRightsBtn = () => {
    dataRightsBtn.value.push({
      buttonName: '',
      remark: '',
      action: ''
    })
  }

  const handleChange =(e, key, column) => {
    console.log(e, key, column)
  }

  const deleteParam = (record) => {
    let index = dataParam.value.findIndex(x => x.menuParamKey === record.menuParamKey)
    if (index > -1) {
      dataParam.value.splice(index, 1)
    }
  }

  const deleteRightsBtn = (record) => {
    let index = dataRightsBtn.value.findIndex(x => x.buttonName === record.buttonName)
    if (index > -1) {
      dataRightsBtn.value.splice(index, 1)
    }
  }
</script>
<style lang="less" scoped>
  .node-conatiner {
    .nc_title {
      margin-top: 6px;
      margin-bottom: 30px;
    }
  }
  :deep(.ant-empty-image) {
    display: none;
  }
</style>
