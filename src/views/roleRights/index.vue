<template>
  <div class="roleRights">
    <div class="leftRole">
      <div class="role">
        角色
        <span class="roleOp marL10 marR10">
          <Icon type="shanchu"></Icon>
        </span>
        <span class="roleOp">
          <Icon type="xinzeng"></Icon>
        </span>
      </div>
      <div class="roleList">
        <a-menu v-model:selectedKeys="selectedKeys">
          <a-menu-item v-for="role in roleList" :key="role.roleId" style="text-align: center;">{{role.roleName}}</a-menu-item>
        </a-menu>

      </div>
    </div>
    <div class="rightsCont">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="权限配置">
          <div class="roleRightsTab">
            <a-card v-for="menu in menuRightsList" :key="menu.id" class="menuCard" :bordered="true">
            <template #title>
              <div v-if="Array.isArray(menu.actions) && menu.actions.length">
                <div class="menuRow">
                <div class="menuRowLeft">
                  <a-checkbox :indeterminate="true" v-model:checked="menu.isChecked">{{menu.menuName}}</a-checkbox>
                </div>
                <div class="menuRowRight">
                  <span v-for="action in menu.actions" :key="action.apiId">
                      <a-checkbox v-model:checked="action.isChecked">{{action.apiName}}</a-checkbox>
                    </span>
                </div>
              </div>
              </div>
              <div v-else class="menuRowLeft" style="border:0">
                <a-checkbox :indeterminate="true" v-model:checked="menu.isChecked">{{menu.menuName}}</a-checkbox>
              </div>
            </template>
            <div v-if="Array.isArray(menu.children) && menu.children.length">
              <div v-for="row in menu.children" :key="row.menuId">
                <div class="menuRow">
                  <div class="menuRowLeft">
                    <a-checkbox v-model:checked="row.isChecked">{{row.menuName}}</a-checkbox>
                  </div>
                  <div class="menuRowRight">
                    <span v-for="action in row.actions" :key="action.apiId">
                      <a-checkbox v-model:checked="action.isChecked">{{action.apiName}}</a-checkbox>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a-card>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="用户列表" force-render>
          <div class="roleRightsTab">
            <a-menu v-model:selectedKeys="selectedUsers">
              <a-menu-item v-for="user in roleUserList" :key="user.id">
                <div class="userRoleItem">
                  <div class="userList">{{user.name}}</div>
                  <div class="userOp">
                    <a-select style="width:150px; float: right;" placeholder="变更角色" v-if="selectedUsers[0] === user.id">
                      <a-select-option :value="2">运维</a-select-option>
                      <a-select-option :value="3">普通用户</a-select-option>
                    </a-select>
                  </div>
                </div>
              </a-menu-item>
            </a-menu>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
import Icon from '/@/components/Icon/index.vue';
  import  { useRoleStore } from '/@/store/modules/roleRights';
  import fetchApi from '/@/api/roleRights'
  
  let activeKey = ref('1');
  let menuRightsList = ref<any[]>()

  const roleStore = useRoleStore();
  let { roleList } = storeToRefs(roleStore);
  let selectedKeys = ref<any[]>([0]);
  let selectedUsers = ref<any[]>([0]);

  let roleUserList = ref<any[]>([
    {
      id: 1,
      name: '张无忌'
    }, {
      id: 2,
      name: '郭靖'
    }, {
      id: 3,
      name: '杨过'
    }, {
      id: 4,
      name: '萧峰'
    }
  ]);

  const initData = async () => {
    console.log("当前roleList的值：", roleList.value)
      if (!(Array.isArray(roleList.value) && roleList.value.length)) {
        let list = await roleStore.getRoleList();
        if (Array.isArray(list) && list.length) {
          selectedKeys.value = [list[0].roleId]
        }
      } else {
        let cachedRoleId = sessionStorage.getItem('currentRoleId')
        if (cachedRoleId) {
          selectedKeys.value = [Number(cachedRoleId)]
        }
      }
    }

    onMounted(() => {
      initData()
    })

    watch(selectedKeys, (val) => {
      console.log('selectedKeys:', val)
      sessionStorage.setItem("currentRoleId", val[0])
      // 根据当前角色获取对应的权限信息
      fetchApi.getRoleRightsById({roleId: val[0]}).then((res: any) => {
        menuRightsList.value = res;

      }).catch(err => {
        console.log(err)
      })
    })



</script>

<style lang="less" scoped>
  .roleRights {
    display: flex;
    flex-flow: row;
  }
  .leftRole {
    width: 250px;
  }
  .role {
    padding-bottom: 10px;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
  }
  .roleOp {
    float: right;
  }
  .roleList {
    :deep(ul) {
      height: 750px;
      overflow: auto;
      margin-top: 16px;
    }
  }
  .rightsCont {
    flex: 1;
    margin: -13px 0 0 40px;
    :deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
      padding: 0 15px;
    }
    :deep(.roleRightsTab) {
      height: 750px;
      overflow: auto;
    }
  }
  .menuCard {
    margin: 15px 0;
    :deep(.ant-card-body) {
      padding: 0;
    }
    :deep(.ant-card-head-title) {
      padding: 0;
      line-height: 60px;
    }
    :deep(.ant-card-head) {
      padding: 0;
    }
  }
  .menuRow {
    display: flex;
    flex-flow: row;
    line-height: 60px;
  }
  .menuRowLeft {
    width: 150px;
    border-right: 1px solid #f0f0f0;
    padding-left: 24px;
  }
  .menuRowRight {
    flex: 1;
    padding-left: 24px;
  }
  .userRoleItem {
    display: flex;
    align-items: center;
    flex-flow: row;
  }
  .userList {
    flex: 1;
    text-align: left;
  }
  .userOp {
    flex: 1;
  }
</style>