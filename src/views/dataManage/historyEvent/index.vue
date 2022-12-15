<template>
    <div class="historyEvent">
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="告警事件">
                <div class="event">
                    <div class="event__header clearfix">
                        <smart-search>
                            <template v-slot:search>
                                <div class="search clearfix">
                                    <span>查询范围(建议丢弃):</span>
                                    <a-select  placeholder="请选择" v-model:value="alertRange" style="width: 250px;">
                                        <a-select-option value="0">今天</a-select-option>
                                        <a-select-option value="1">过去一周</a-select-option>
                                        <a-select-option value="2">过去一月</a-select-option>
                                        <a-select-option value="3">过去一年</a-select-option>
                                    </a-select>
                                </div>

                                <div class="search clearfix">
                                    <span>日期范围:</span>
                                    <a-range-picker v-model:value="alertDateRange" style="width: 250px;" />
                                </div>

                                <div class="search clearfix">
                                    <span>告警级别:</span>
                                    <a-select  placeholder="请选择" v-model:value="alertLevel" style="width: 250px;">
                                        <a-select-option value="0">紧急</a-select-option>
                                        <a-select-option value="1">严重</a-select-option>
                                        <a-select-option value="2">警告</a-select-option>
                                        <a-select-option value="3">信息</a-select-option>
                                    </a-select>
                                </div>

                                <div class="search clearfix">
                                    <span>关键字:</span>
                                    <a-input v-model:value="alertKeyword" placeholder="请输入" style="width: 250px;" />
                                </div>
                            </template>
                            <template v-slot:actions>
                                <a-button style="margin-top: 14px" @click="resetAlert">
                                    重置
                                </a-button>
                                <a-button type="primary" @click="queryAlert"> 查询 </a-button>
                                <a-button @click="exportAlertData"> 导出 </a-button>
                            </template>
                        </smart-search>
                    </div>
                    <div class="event__content">
                        <a-table :columns="columnsAlert" :data-source="alertData" :scroll="{ x: 1168 }">
                            <template #bodyCell="{ column }">
                                <template v-if="column.key === 'action'">
                                    <a>查看详情</a>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="系统事件" force-render>
                <div class="event">
                    <div class="event__header clearfix">
                        <smart-search>
                            <template v-slot:search>
                                <div class="search clearfix">
                                    <span>查询范围(建议丢弃):</span>
                                    <a-select  placeholder="请选择" v-model:value="alertRange" style="width: 250px;">
                                        <a-select-option value="0">今天</a-select-option>
                                        <a-select-option value="1">过去一周</a-select-option>
                                        <a-select-option value="2">过去一月</a-select-option>
                                        <a-select-option value="3">过去一年</a-select-option>
                                    </a-select>
                                </div>

                                <div class="search clearfix">
                                    <span>日期范围:</span>
                                    <a-range-picker v-model:value="alertDateRange" style="width: 250px;" />
                                </div>

                                <div class="search clearfix">
                                    <span>关键字:</span>
                                    <a-input v-model:value="alertKeyword" placeholder="请输入" style="width: 250px;" />
                                </div>
                            </template>
                            <template v-slot:actions>
                                <a-button style="margin-top: 14px" @click="resetAlert">
                                    重置
                                </a-button>
                                <a-button type="primary" @click="queryAlert"> 查询 </a-button>
                                <a-button @click="exportAlertData"> 导出 </a-button>
                            </template>
                        </smart-search>
                    </div>
                    <div class="event__content">
                        <a-table :columns="columnsAlert" :data-source="alertData" :scroll="{ x: 1168 }">
                            <template #bodyCell="{ column }">
                                <template v-if="column.key === 'action'">
                                    <a>查看详情</a>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </div>
            </a-tab-pane>
            <a-tab-pane key="3" tab="运维事件">
                <div class="event">
                    <div class="event__header clearfix">
                        <smart-search>
                            <template v-slot:search>
                                <div class="search clearfix">
                                    <span>查询范围(建议丢弃):</span>
                                    <a-select  placeholder="请选择" v-model:value="alertRange" style="width: 250px;">
                                        <a-select-option value="0">今天</a-select-option>
                                        <a-select-option value="1">过去一周</a-select-option>
                                        <a-select-option value="2">过去一月</a-select-option>
                                        <a-select-option value="3">过去一年</a-select-option>
                                    </a-select>
                                </div>

                                <div class="search clearfix">
                                    <span>日期范围:</span>
                                    <a-range-picker v-model:value="alertDateRange" style="width: 250px;" />
                                </div>

                                <div class="search clearfix">
                                    <span>操作员:</span>
                                    <a-select  placeholder="请选择" v-model:value="operator" style="width: 250px;">
                                        <a-select-option value="0">张三</a-select-option>
                                        <a-select-option value="1">李四</a-select-option>
                                        <a-select-option value="2">王五</a-select-option>
                                        <a-select-option value="3">赵六</a-select-option>
                                    </a-select>
                                </div>

                                <div class="search clearfix">
                                    <span>关键字:</span>
                                    <a-input v-model:value="alertKeyword" placeholder="请输入" style="width: 250px;" />
                                </div>
                            </template>
                            <template v-slot:actions>
                                <a-button style="margin-top: 14px" @click="resetAlert">
                                    重置
                                </a-button>
                                <a-button type="primary" @click="queryAlert"> 查询 </a-button>
                                <a-button @click="exportAlertData"> 导出 </a-button>
                            </template>
                        </smart-search>
                    </div>
                    <div class="event__content">
                        <a-table :columns="columnsAlert" :data-source="alertData" :scroll="{ x: 1168 }">
                            <template #bodyCell="{ column }">
                                <template v-if="column.key === 'action'">
                                    <a>查看详情</a>
                                </template>
                            </template>
                        </a-table>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script lang="ts" setup>
    import SmartSearch from '/@/components/SmartSearch.vue';
    import { columnsAlert } from './column';
    import type { Dayjs } from 'dayjs';
    type RangeValue = [Dayjs, Dayjs];
    let activeKey = ref<string>('1')
    let alertDateRange = ref<RangeValue>();
    let alertRange = ref<any>(undefined);
    let alertLevel = ref('');
    let alertKeyword = ref('');
    let alertData = ref<any[]>([]);


    let operator = ref('');

    const resetAlert = () => {};
    const queryAlert = () => {};
    const exportAlertData = () => {};

</script>

<style lang="less" scoped>
.event {
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