<template>
  <a-row type="flex" class="alertLevelButton">
    <a-col flex="100px">
      <a-button type="primary" @click="addNewAlertLevel">{{$t('add')}}</a-button>
    </a-col>
  </a-row>
    <a-table :columns="columns" :data-source="dataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'alertLevelName'">
          <div>
            <a-input
              v-if="editableData[record.id]"
              v-model:value="editableData[record.id][column.dataIndex]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'alertLevelColor'">
          <div>
            <input v-if="editableData[record.id]" type="color" :value="editableData[record.id].alertLevelColor" @input="setColor($event, editableData[record.id])" @change="handleChangeColor(editableData[record.id])" />
            <template v-else>
              <div :style="{ width: '30px', height: '30px', background: record.alertLevelColor, margin: '0 auto'}"></div>
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'alertLevelDesc'">
          <span v-if="editableData[record.id]" :style="{color: editableData[record.id].alertLevelColor}">{{ `这是${editableData[record.id].alertLevelName}` }}</span>
          <span v-else :style="{color: record.alertLevelColor}">{{ `这是${record.alertLevelName}` }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.id]">
              <a-typography-link @click="save(record.id)">保存</a-typography-link>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.id)">编辑</a>
            </span>
            <span><a @click="deleteRecord(record.id)">删除</a></span>
          </div>
        </template>
      </template>
    </a-table>
  </template>
  <script lang="ts" setup>
      import { cloneDeep } from 'lodash-es';
      import { reactive } from 'vue';
      import type { UnwrapRef } from 'vue';
      import {columns} from './column';
      import { useAlertSettingStore } from '/@/store/modules/alertSetting'
      
      const editableData: UnwrapRef<Record<string, any>> = reactive({});

      const alertStore = useAlertSettingStore();
      const dataSource = ref<any[]>([]);
      let alertSettingList = computed(() => alertStore.alertLevelList);

      watch(alertSettingList, (val) => {
        dataSource.value = val;
      })
  
      const edit = (id: number) => {
        editableData[id] = cloneDeep(dataSource.value.filter(item => id === item.id)[0]);
        console.log(editableData)
      };
      const save = (id: number) => {
        // todo调用保存接口更新数据
        //mock
        let newList: any[] = cloneDeep(dataSource.value);
        let index = newList.findIndex((x:any) => x.id === id);
        if (index > -1) {
          newList.splice(index, 1, editableData[id])
        }
        alertStore.setAlertLevelList(newList)
        delete editableData[id];
      };
      const cancel = (id: number) => {
        delete editableData[id];
      };

      const deleteRecord = (id: number) => {
        console.log(id)
      }

      const handleChangeColor = (data) => {
        console.log("change Data:", data)
      }

      const setColor = (e, data) => {
        console.log(e, e.target.value, e.srcElement.value);
        data.alertLevelColor = e.target.value;
      }

      const addNewAlertLevel = () => {
        let index  = dataSource.value.length + 1;
        let newItem = {
          id: index,
          alertLevelName: '',
          alertLevelColor: '#ff0000'
        }
        dataSource.value.push(newItem)
        editableData[index] = cloneDeep(dataSource.value.filter(item => index === item.id)[0]);
      }

      const initData = () => {
      if (!(Array.isArray(alertSettingList.value) && alertSettingList.value.length)) {
        alertStore.getAlertLevelList();
      } else {
        console.log('cached menulist:',alertSettingList.value)
      }
    }

    onMounted(() => {
      initData()
    })
  </script>
  <style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  .alertLevelButton {
    margin-bottom: 24px;
  }
  </style>