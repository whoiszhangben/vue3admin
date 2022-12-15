<template>
  <h3 :style="{ margin: '16px 0' }">组件列表</h3>
  <a-list size="large" bordered :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <router-link :to="item.url">{{ item.name }}</router-link>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
const data: any[] = [
  {
    name: "拖拉拽组件",
    url: "drag",
  },
  {
    name: "角色权限组件",
    url: "authority",
  },
];

export default defineComponent({
  setup() {
    return {
      data,
    };
  },
});
</script>

<style>
</style>