import { Layout, Menu, } from 'ant-design-vue';
import Icon from '/@/components/Icon/index.vue';
import { PropType, h } from 'vue';
import { MenuDataItem } from '../utils/typings';
import { router } from '/@/router';
import './index.less';
import i18n from '../../../locale'
import { APP_TITLE } from '../../../../config/constant';

export default defineComponent({
  name: 'BaseMenu',
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
    menuWidth: {
      type: Number,
      default: 208,
    },
    menuData: {
      type: Array as PropType<MenuDataItem[]>,
      default: () => [],
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const state = reactive<any>({
      openKeys: [],
      selectedKeys: [],
    });

    watchEffect(() => {
      if (router.currentRoute) {
        const matched = router.currentRoute.value.matched.concat();
        state.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path);
        state.openKeys = matched
          .filter((r) => r.path !== router.currentRoute.value.path)
          .map((r) => r.path);
      }
    });

    const onSelect = (e: { key: string; item: { props: { routeid: number } } } | any) => {
      router.push(e.key);
    };

    const getIcon = (type?: string) =>
      type ? <Icon type={type} className="sideMenu-icon" /> : null;

    // 构建树结构
    const makeTreeDom = (data: MenuDataItem[]): JSX.Element[] => {
      return data.map((item: MenuDataItem) => {
        if (item.children) {
          return (
            <Menu.SubMenu
              key={item.path}
              title={
                <>
                  {getIcon(item.meta?.icon as string)}
                  <span>{item.meta ? i18n.global.t(item.meta.title as string) : ''}</span>
                </>
              }
            >
              {makeTreeDom(item.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item key={item.path}>
            {getIcon(item.meta?.icon as string)}
            <span>{item.meta ? i18n.global.t(item.meta.title as string) : ''}</span>
          </Menu.Item>
        );
      });
    };

    return () => {
      return (
        <Layout.Sider
          width={208}
          collapsedWidth={54}
          class="my-sideMenu-sider"
          theme="dark"
          trigger={null}
          breakpoint="lg"
          collapsible
          collapsed={props.collapsed}
        // collapsedWidth={48}
        >
          {/* top */}
          <div class="my-sideMenu-sider_top">
            {h('div', { class: 'my-sideMenu-sider_top_logoWrap' }, [
              // h('img', { src: imgSrc.value, class: 'logo' }),
              h('span', { class: props.collapsed ? 'my-sideMenu-sider_top_logoWrap_title1' : 'my-sideMenu-sider_top_logoWrap_title' }, APP_TITLE)
            ])}
          </div>
          {/* menu */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={state.selectedKeys}
            {...(props.collapsed ? {} : { openKeys: state.openKeys })}
            onOpenChange={(keys: any[]) => (state.openKeys = keys)}
            onSelect={onSelect}
            class="my-sideMenu-sider_menu"
          >
            {makeTreeDom(props.menuData)}
          </Menu>
        </Layout.Sider>
      );
    };
  },
});
