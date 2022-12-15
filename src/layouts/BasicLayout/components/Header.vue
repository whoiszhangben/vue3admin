<template>
  <a-layout-header class="header">
    <menu-unfold-outlined
          v-if="props.collapsed"
          class="trigger adjustSpace"
          @click="() => ( emits('collapsed', props.collapsed))"
    />
    <menu-fold-outlined v-else class="trigger adjustSpace" @click="() => ( emits('collapsed', props.collapsed))" />
    <RightContent />
  </a-layout-header>
</template>
<script setup lang="ts">
  import RightContent from './RightContent.vue';
  import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
  // props
  const props = defineProps({
    collapsed: {
      type: Boolean,
      default: () => {
        return false;
      },
    }
  });

  const emits = defineEmits(['collapsed']);
</script>
<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    height: 60px;
    padding: 0;
    background: #ffffff;
    box-shadow: 0 1px 4px #00152914;
    z-index: 1;
  }
  .adjustSpace {
    padding-left: 15px
  }
</style>
