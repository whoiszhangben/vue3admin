import { defineStore } from 'pinia';
import { store } from '/@/store';
import { ReqParams } from '/@/api/user/model';
import fetchApi from '/@/api/user';
// import { encryptByDES } from '/@/utils/crypto';
import { getToken, setToken, removeToken } from '/@/utils/auth';
import { router } from '/@/router';

interface UserState {
  token: string;
  auths: any[];
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // token
    token: '',
    // auths
    auths: [],
  }),
  getters: {
    getToken(): string {
      return this.token || getToken();
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info ?? ''; // for null or undefined value
      setToken(info);
    },
    setAuth(auths: any[]) {
      this.auths = auths;
    },
    resetState() {
      this.token = '';
      this.auths = [];
    },
    /**
     * @description: login
     */
    async login(params: ReqParams) {
      // 密码加密
      // params.password = encryptByDES(params.password);
      try {
        const res = await fetchApi.login(params);
        if (res) {
          // save token
          this.setToken(res.token);
          this.setAuth(res.user.authorities)
        }
        return res;
      } catch (err: any) {
        console.log(err.message)
        return null
      }
    },

    /**
     * @description: logout
     */
    async logout() {
      this.resetState();
      removeToken();
      router.replace('/login');
      // 路由表重置
      location.reload();
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
