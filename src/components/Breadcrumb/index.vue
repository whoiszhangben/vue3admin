<template>
  <a-breadcrumb :routes="breadcrumb">
    <a-breadcrumb-item v-for="item in breadcrumb" :key="item.path" @click="handleBreadcrumb">{{ item.breadcrumbName }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup lang="ts">
  import { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb';
  import i18n from '../../locale' 

  const router = useRouter();

  const emits = defineEmits(['handleClick']);

  const breadcrumb = computed(
    () =>
      router.currentRoute.value.matched
        .filter((n) => !['/', '/admin'].includes(n.path))
        .map((item) => {
          return {
            path: item.path,
            breadcrumbName: i18n.global.t(item.meta.title as string) || '',
          };
        }) as Route[],
  );

  const handleBreadcrumb = () => {
    emits('handleClick', breadcrumb.value);
  };
</script>
<style scoped>
  .link {
    text-decoration: none;
  }
</style>
