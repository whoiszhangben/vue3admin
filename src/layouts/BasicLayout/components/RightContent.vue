<template>
  <div class="sys-setting">
    <a-dropdown placement="bottom">
      <template #overlay>
        <a-menu :selectedKeys="selectedKeys" class="menu-box">
          <a-menu-item v-for="item in navs" :key="item.key" @click="handleClick(item?.key)">
            <template #icon>
              <Icon align="1px" size="20px" :type="item.icon" />
            </template>
            <span>{{ t(item.key) }}</span>
          </a-menu-item>
        </a-menu>
      </template>
      <a-space class="wrap" align="baseline" direction="horizontal">
        <Icon align="2px" type="xitongshezhi" />
        <span class="setting">Admin</span>
        <Icon align="2px" type="xialajiantou" />
      </a-space>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">

  import { useI18n } from 'vue-i18n';
  import { useUserStore } from '/@/store/modules/user';
  import { navs as myNavs } from './constant';
  import { usePermissioStore } from '/@/store/modules/permission';

  const store = useUserStore();
  const permissioStore = usePermissioStore();
  const router = useRouter();
  const { locale, t } = useI18n()

  const navs = ref(myNavs);
  const selectedKeys = ref<string[]>([]);

  watchEffect(() => {
    const modules = permissioStore.getModules;
    if (modules.length && permissioStore.getIsAdmin === 0) {
      navs.value = unref(navs).filter((n) => (n.auth ? modules.includes(n.auth) : true));
    }
  });

  watchEffect(() => {
    if (router.currentRoute) {
      const matched = router.currentRoute.value.matched.concat();
      selectedKeys.value = matched.filter((r) => r.name !== 'index').map((r) => r.path);
    }
  });

  // 通过locale.value切换
  const setLangCondition = (v) => {
        locale.value = v;
    }

  const handleClick = (key?: string) => {
    switch(key) {
      case "exit":
        store.logout();
        break;
      case "toggleLang":
        let currentLang = localStorage.getItem('locale') || 'zh';
        if (currentLang === 'zh') {
          setLangCondition('en')
          localStorage.setItem('locale', 'en');
        } else {
          setLangCondition('zh')
          localStorage.setItem('locale', 'zh');
        }
        break;
    }
  };
</script>

<style lang="less" scoped>
  .sys-setting {
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    padding-right: 16px;
    .wrap {
      height: 55px;

      .setting {
        font-size: 16px;
        font-weight: 600;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin: 0 8px 0 4px;
      }
    }
    .my-icon {
      font-size: 18px !important;
    }
  }
  .menu-box :deep(.ant-dropdown-menu-item) {
    width: 142px;
    height: 42px;
    line-height: 42px;
    padding: 0 16px;
  }
  .menu-box :deep(.ant-dropdown-menu-item-selected) {
    background: #eaeffe;
    color: #3860f4;
  }
</style>
