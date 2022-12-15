<template>
  <a-config-provider :locale="locale" :getPopupContainer="getPopupContainer">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { useTitle } from '/@/hooks/useTitle';
  import { useTitle as usePageTitle } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import enGB from 'ant-design-vue/es/locale/en_GB';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import 'dayjs/locale/en-gb';
  
  useTitle();

  const getPopupContainer = (el, dialogContext) => {
    if (dialogContext) {
      return dialogContext.getDialogWrap();
    } else {
      console.log(el);
      return document.body;
    }
  }

  const locale = computed(() => {
    const { locale, t } = useI18n()
    const { currentRoute } = useRouter();
    const route = unref(currentRoute);
    const tTitle = route?.meta?.title as string; 
    const pageTitle = usePageTitle();
    if(tTitle) {
      pageTitle.value = t(tTitle);
    }

    console.log('computed:', locale.value, )
    switch(locale.value) {
      case "zh":
        dayjs.locale('zh-cn');
        return zhCN;
      case 'en':
        dayjs.locale('en-gb');
        return enGB;
    }
  })
</script>
