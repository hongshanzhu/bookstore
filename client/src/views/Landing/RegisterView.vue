<template>
  <div
    class="register flex justify-center items-center min-h-screen text-center"
  >
    <form @submit="(e) => register(e)" class="register-box">
      <h1 class="text-sky-500 text-2xl font-bold mb-4">注册</h1>
      <div
        class="box shadow bg-white w-80 border-2 space-y-4 flex flex-col p-5"
      >
        <input
          v-model="user.fullname"
          type="text"
          class="input-field border outline-none px-3 py-2"
          placeholder="姓名"
        />
        <input
          v-model.trim="user.username"
          type="text"
          class="input-field border outline-none px-3 py-2"
          placeholder="用户名"
        />
        <input
          v-model.trim="user.password"
          type="password"
          class="input-field border outline-none px-3 py-2"
          placeholder="密码"
        />
        <select v-model="user.gender" class="border outline-none px-3 py-2">
          <option value="Male">男</option>
          <option value="Female">女</option>
        </select>
        <button
          :disabled="loading"
          class="button bg-sky-500 transition border border-sky-500 text-white rounded p-2 px-4 hover:bg-sky-600 hover:border-sky-600 disabled:bg-gray-200 disabled:cursor-default disabled:border-none"
          type="submit"
        >
          提交
        </button>
      </div>
      <p class="text-sm font-semibold mt-4">
        如果已经注册, 请登录
        <router-link to="/login" class="text-sky-500 underline"
          >登录</router-link
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, computed } from "vue";

const store = useStore();

const user = reactive({
  username: "",
  password: "",
  fullname: "",
  gender: ""
});

const loading = computed(() => {
  return store.state.loading;
});

const register = async (e) => {
  e.preventDefault();

  if (!user.username || !user.password) {
    alert("用户名和密码是必填项");
  } else {
    store.dispatch("auth/register", user);
  }
};
</script>

<style></style>
