<template>
    <div class="orgDiv">
        <div class="orgTree">
            <a-tree v-model:expandedKeys="expandedKeys" :tree-data="treeData" :fieldNames="{ children:'children', title:'name', key:'id'}" @select="onSelect" v-model:selected-keys="selectedKeys">
                <template #title="{ id: treeKey, name: title }">
                    <span>{{ title }}</span>
                    <span class="opGroup" v-if="currentKey === treeKey">
                        <plus-outlined class="marR10" title="新增子机构" @click.stop="addSub" />
                        <edit-outlined class="marR10" title="编辑当前机构" @click.stop="editOrg" />
                        <delete-outlined title="删除当前机构" @click.stop="deleteOrg" />
                    </span>
                </template>
                
            </a-tree>
        </div>
        <div class="orgDetail">
            <div v-if="currentKey">
                <div class="orgTitle">详情</div>
                <div class="orgDesc">
                <p style="color: #1890ff">
                    <span v-if="selectOrg.isdept || selectOrg.parent">
                    {{ formatOrgStr() }}</span
                    >
                </p>
                <p style="font-size: 16px; font-weight: 700; color: #1d2129">
                    {{ selectOrg.name }}
                </p>
                <p style="color: #999999">{{ `- ${selectOrg.code} -` }}</p>
                </div>
            </div>
            <div v-else>
                <img src="../../assets/images/logo3.png" />
            </div>
        </div>
        <Modal :width="550" v-bind="modalState" @cancel="handleCancel" @ok="handleSubmit">
        <a-form
          ref="orgRef"
          :model="orgFormModel"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('parentRegion')" name="parentRegion">
                <a-select v-model:value="orgFormModel.parentRegion" :disabled="true">
                  <a-select-option v-for="org in areaStore.areaList" :key="org.id">{{org.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('regionName')" name="regionName">
                <a-input v-model:value="orgFormModel.regionName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item :label="$t('regionDesc')" name="regionDesc">
                <a-textarea v-model:value="orgFormModel.regionDesc" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </Modal>
    </div>
    
  </template>
  <script lang="ts" setup>
    import { useAreaStore } from '/@/store/modules/area';
    import { PlusOutlined, EditOutlined, DeleteOutlined,ExclamationCircleOutlined  } from '@ant-design/icons-vue';
    import { useI18n } from 'vue-i18n';
    import type { FormInstance } from 'ant-design-vue';
    import type { Rule } from 'ant-design-vue/es/form';
    import { Modal as AModal } from 'ant-design-vue';
    import { createVNode } from 'vue';

    const { t } = useI18n();
    const areaStore = useAreaStore();
    let treeData = computed(() => areaStore.getOrgTree);

    const expandedKeys = ref<number[]>([]);
    const selectedKeys = ref<number[]>([]);
    const currentKey = ref<number>(0);
    const selectOrg = computed(() => areaStore.selectOrg);

    // modal
    const modalState = reactive({
      loading: false,
      visible: false,
      title: t('addRootMenu'),
      okText: t('Add'),
    });
    const orgRef = ref<FormInstance>();
    // form
    const orgFormModel = ref({
      id: 0,
      parentRegion: null,
      regionName: '',
      regionDesc: '',
    });
    const labelCol = { style: { width: '110px' } };
    const wrapperCol = { span: 17 };
    const rules: Record<string, Rule[]> = {
      regionName: [{ required: true, trigger: 'blur' }],
      regionCode: [
        {
          required: true,
          trigger: 'change',
          validator: (_, val) => (val ? Promise.resolve() : Promise.reject('请输入区域编码')),
        },
      ],
    };
  
    watch(expandedKeys, () => {
        console.log('expandedKeys', expandedKeys.value.forEach(item => console.log(typeof(item))));
    });

    const onSelect = async (params, e) => {
        console.log(params, e, selectedKeys);
        if (e.selected) {
            currentKey.value = e.node.id;
            areaStore.setSelectOrg(e.node);
        }
    }

    const initData = () => {
      if (!(Array.isArray(treeData.value) && treeData.value.length)) {
        areaStore.getAreaList();
      } else {
        console.log('cached menulist:',treeData.value)
      }
    } 

    const formatOrgStr = () => {
        console.log('---areaStore.selectOrg.value:', areaStore.selectOrg)
        let orgParent = areaStore.selectOrg.parent.nodes;
        if (Array.isArray(orgParent)) {
            let parentArr = orgParent.map((item) => item.name);
            return parentArr.reverse().join("/");
        }
    }

    const addSub = () => {
        modalState.title = t("addSubRegion");
        modalState.okText = t("add");
        modalState.visible = true;
        let orgParent = areaStore.selectOrg;
        orgFormModel.value.parentRegion = orgParent.id;
        console.log('addSub:', orgParent.name)
    }

    const editOrg = () => {
      modalState.title = t('editRegion');
      modalState.okText = t('edit');
      modalState.visible = true;
      let orgParent = areaStore.selectOrg;
      orgFormModel.value.id = orgParent.id;
    }

    const deleteOrg = () => {
      AModal.confirm({
        title: '删除区域',
        icon: createVNode(ExclamationCircleOutlined),
        content: '您确定要删除当前区域吗?',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {},
      })
    }

    const handleCancel = () => {
      modalState.visible = false;
      orgRef.value?.resetFields();
    }

    const handleSubmit = () => {
      orgRef.value?.validate()
      .then(async () => {
        modalState.loading = true;
        modalState.loading = false;
      })
      .catch(console.log);
    }


    onMounted(() => {
      initData();
      expandedKeys.value=[1,3];
    })
  </script>
<style lang="less" scoped>
    .orgDiv {
        display: flex;
        flex-flow: row;
        .orgTree {
            width: 350px;
            min-width: 350px;
            :deep(.ant-tree .ant-tree-treenode) {
                width: 100%;
                position: relative;
            }
            :deep(.ant-tree .ant-tree-node-content-wrapper) {
                position: unset;
            }
            :deep(.opGroup) {
                position: absolute;
                right: 5px;
                bottom: 6px;
            }
        }
        .orgDetail {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            border-left: 1px solid #ebebeb;
        }
    }
    .orgTitle {
        position: absolute;
        width: 100%;
        background: #fafafa;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        top: 0;
        left: 0;
        line-height: 40px;
        padding-left: 26px;
        }
        .orgDesc {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }

</style>