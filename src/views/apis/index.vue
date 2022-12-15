<template>
    <div class="menu-conatiner">
      <Table
        ref="ApiELRef"
        :url="fetchApi.apiList"
        :columns="columns"
        :items="tableFilterItems"
        :button="tableFilterButton"
        :actions="tableActions"
        :model="tableFilterModel"
        :scroll="{ x: 1300, y: 1000 }"
      />
      <Modal v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
        <a-form
          ref="ApiRef"
          :model="ApiFormModel"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('apiURL') + ':'" name="apiURL">
                <a-input v-model:value="ApiFormModel.apiURL" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('method') + ':'" name="method">
                <a-select v-model:value="ApiFormModel.method">
                  <a-select-option value="POST">POST</a-select-option>
                  <a-select-option value="GET">GET</a-select-option>
                  <a-select-option value="PUT">PUT</a-select-option>
                  <a-select-option value="DELETE">DELETE</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('apiMenu') + ':'" name="apiMenu">
                <!-- <a-select v-model:value="ApiFormModel.apiMenu">
                  <a-select-option v-for="item in menuList" :key="item.id">{{$t(item.menuName)}}</a-select-option>
                </a-select> -->
                <a-tree-select
                  v-model:value="ApiFormModel.apiMenu"
                  show-search
                  style="width: 100%"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :placeholder="$t('plsSelect')"
                  allow-clear
                  tree-default-expand-all
                  :tree-data="menuTreeData"
                >
                  <template #title="{ value: val, title }">
                    <b v-if="val === 'parent 1-1'" style="color: #08c">sss</b>
                    <template v-else>{{ $t(title) }}</template>
                  </template>
                </a-tree-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('description') + ':'" name="description">
                <a-input v-model:value="ApiFormModel.description" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </Modal>
    </div>
  </template>
  <script setup lang="ts">
    import { columns } from './constant';
    import fetchApi from '/@/api/apis';
    import { useMessage } from '/@/hooks/useMessage';
    import { validatePhone } from '/@/utils/validate';
    import type { FormInstance } from 'ant-design-vue';
    import type { Rule } from 'ant-design-vue/es/form';
    import i18n from '../../locale'
    import { useI18n } from 'vue-i18n';
    import { useMenuStore } from '/@/store/modules/menu'
  
    const mockReq = (params?: any): Promise<Boolean> =>
      new Promise((resolve) => setTimeout(() => resolve(params ? !!params : true), 500));
  
    const { createMessage } = useMessage();
    const ApiRef = ref<FormInstance>();
    const ApiELRef = ref<{ refresh: () => void }>();
    const refresh = () => ApiELRef.value?.refresh(); // 参数不变，直接更新
    // const run = (args) => ApiELRef.value.run(args); // Table提供run方法接受参数，做到更自由控制数据更新
  
    const labelCol = { style: { width: '110px' } };
    const wrapperCol = { span: 17 };
    const { t } = useI18n();
    const menuStore = useMenuStore();
    const menuTreeData = computed(() => {
      return menuStore.menuTreeData;
    })

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
    const ApiFormModel = ref({
      apiURL: '',
      method: '',
      apiMenu: '',
      description: '',
    });
  
    const tableActions = reactive([
      {
        label: 'edit',
        // auth: AuthEnum.user_update,
        onClick: async (row) => {
          modalState.title = 'edit';
          modalState.okText = i18n.global.t('edit');
          modalState.visible = true;
          ApiFormModel.value = row;
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
      ApiRef.value?.resetFields();
    };
  
    const handleSubmit = () => {
      ApiRef.value
        ?.validate()
        .then(async () => {
          modalState.loading = true;
          // const req = modalState.title === '新增用户' ? store.fetchCreate : store.fetchUpdate;
          const res = await mockReq(ApiFormModel.value);
          modalState.loading = false;
          if (res) {
            createMessage.success(`${modalState.title === '新增用户' ? '新增' : '修改'}用户成功`);
            handleCancel();
            console.log('ApiELRef.value', ApiELRef.value);
            refresh();
          }
        })
        .catch(console.log);
    };
  
    // filter
    const tableFilterModel = reactive({});
    const tableFilterButton = reactive({
      type: 'primary',
      label: 'add',
      // auth: AuthEnum.user_create,
      onClick: () => {
        modalState.title = t("addApi");
        modalState.okText = t("add");
        modalState.visible = true;
      },
    });
  
    const tableFilterItems = computed(() => []);

    const initData = () => {
      console.log('start to invoke initData');
      if (!(Array.isArray(menuTreeData.value) && menuTreeData.value.length)) {
        menuStore.getMenuList();
      } else {
        console.log('cached menulist:',menuTreeData.value)
      }
    }

    onMounted(() => {
      initData()
    })

    

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
  