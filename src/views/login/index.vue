<template>
  <div class="login">
    <a-form
      name="custom-validation"
      ref="formRef"
      :model="form"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
    >
      <a-form-item required name="username">
        <a-input
          v-model:value="form.username"
          size="large"
          placeholder="账号"
        />
      </a-form-item>
      <a-form-item required name="password">
        <a-input-password
          v-model:value="form.password"
          size="large"
          type="password"
          placeholder="密码"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item>
        <a-button
          class="login-btn"
          size="large"
          type="primary"
          html-type="submit"
          :loading="loading"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
  <script setup>
import { reactive, ref } from "vue";
import { useUserStore } from '/@/store/modules/user';
import { message } from "ant-design-vue";

const userStore = useUserStore();

let usernameRule = async (rule, value) => {
  if (!value) {
    return Promise.reject("请输入");
  }
};

let passwordRule = async (rule, value) => {
  if (value === "") {
    return Promise.reject("请输入");
  }
  return Promise.resolve();
};

const rules = {
  username: [
    {
      validator: usernameRule,
      trigger: ["change", "blur"],
    },
  ],
  password: [
    {
      validator: passwordRule,
      trigger: ["change", "blur"],
    },
  ],
};
const form = reactive({
  username: "admin",
  password: "123456",
});
const loading = ref(false);
const formRef = ref();
const router = useRouter();

const handleFinish = async (values) => {
    // console.log(checked, values);
    loading.value = true;
    const res = await userStore.login(values);
    loading.value = false;
    if (res) {
      // router.replace({ path: state.redirect || '/', query: state.otherQuery });
      router.replace('/');
    } else {
      message.error('失败');
    }
  };

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};
</script>
  
  <style scoped lang="less">
.login {
  width: 340px;
  margin: 0 auto;
  padding: 300px 0;
  .login-btn {
    width: 100%;
  }
}
</style>