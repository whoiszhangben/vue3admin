<template>
    <div class="historyData">
        <div class="historyData__header clearfix">
            <smart-search>
                <template v-slot:search>
                    <div class="search clearfix">
                        <span>查询范围(建议丢弃):</span>
                        <a-select  placeholder="请选择" v-model:value="range" style="width: 250px;">
                            <a-select-option value="0">今天</a-select-option>
                            <a-select-option value="1">过去一周</a-select-option>
                            <a-select-option value="2">过去一月</a-select-option>
                            <a-select-option value="3">过去一年</a-select-option>
                        </a-select>
                    </div>

                    <div class="search clearfix">
                        <span>日期范围:</span>
                        <a-range-picker v-model:value="dateRange" style="width: 250px;" />
                    </div>

                    <div class="search clearfix">
                        <span>关键字:</span>
                        <a-input v-model:value="keyWord" placeholder="请输入" style="width: 250px;" />
                    </div>
                </template>
                <template v-slot:actions>
                    <a-button style="margin-top: 14px" @click="resetParams">
                            重置
                        </a-button>
                        <a-button type="primary" @click="query"> 查询 </a-button>
                        <a-button @click="exportData"> 导出 </a-button>
                </template>
            </smart-search>
        </div>
        <div class="historyData__content">
            <a-table :columns="columns" :data-source="hostoryData" :scroll="{ x: 1168 }">
                <template #bodyCell="{ column }">
                    <template v-if="column.key === 'action'">
                        <a>查看详情</a>
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { columns } from './column';
    import SmartSearch from '/@/components/SmartSearch.vue';
    import fetchApi from '/@/api/logs/index';

    import type { Dayjs } from 'dayjs';
    type RangeValue = [Dayjs, Dayjs];
    let dateRange = ref<RangeValue>();
    let range = ref<any>(undefined);
    let keyWord = ref('');
    let hostoryData = ref<any[]>([
    ])

    const resetParams = () => {}
    const query = () => {}
    const exportData = () => {}

    const initTableData = async (data) => {
        const res = await fetchApi.historyDataList(data);
        hostoryData.value = res.list;
    }

    initTableData({});
</script>

<style lang="less" scoped>
.historyData {
  &__header {
    & > div {
      margin: 0 -23px;
    }
    .search {
      float: left;
      height: 32px;
      margin-bottom: 16px;
      margin-right: 16px;
      > span:first-child {
        display: inline-block;
        margin-right: 10px;
        min-width: 4.2em;
        font-size: 14px;
      }
      .w {
        display: inline-block;
        vertical-align: middle;
        width: 216px;
        margin-left: 8px;
      }
    }
    .button {
      float: right;
      button {
        margin-left: 8px;
      }
    }
  }
  &__content {
    margin-top: 14px;
    padding-top: 16px;
    :deep(.ant-table-body) {
      color: #111218;
      // max-height: 600px !important;
      max-height: calc(100vh - 255px) !important;
      height: calc(100vh - 255px) !important;
      :deep(.ant-table-row:last-child td) {
        border-bottom: none !important;
      }
      // max-height: calc(100vh - 300px)!important;
      // @media screen and (min-width: 1670px) {
      // }
    }
    :deep(.ant-table-body) {
      max-height: calc(100vh - 276px) !important;
      height: calc(100vh - 276px) !important;
    }
  }
  &__footer {
    margin-left: -23px;
    margin-right: -23px;
    border-top: 1px solid rgba(232, 232, 232, 1);
    & > div {
      float: right;
      padding: 8px 0;
      margin-right: 24px;
    }
    :deep(.ant-pagination-options-quick-jumper input) {
      vertical-align: top;
    }
    :deep(.ant-pagination-options) {
      height: 32px;
    }
  }
  &__link {
    color: @primary-color;
  }
  :deep(.ant-pagination-total-text) {
    margin-right: 16px;
  }
}
</style>