<script setup>
import Cookies from "js-cookie";
import { computed, reactive } from "vue";
import api from "@/helpers/api";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => {
  return store.state.loading;
});

const account = reactive(JSON.parse(Cookies.get("account")));

const updateAccount = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    console.log('account', account)
    const accessToken = Cookies.get("token")
    const res = await api.put(`/accounts/${account._id}`, { account }, {
      headers: {
        'Authorization': `token ${accessToken}`
      },body:{
        username: account.username,
        account
      }   
    });
    console.log('updateAccount response', res)
    Cookies.remove("account");
    Cookies.set("account", JSON.stringify(res.data.account));

    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: res.data.msg, type: "success" },
      { root: true }
    );

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: error.message, type: "error" },
      { root: true }
    );
  }
};

const logOut = () => {
  Cookies.remove("token");
  Cookies.remove("account");

  window.location.reload();
};

const deleteAccount = async () => {
  store.commit("setLoading", true, { root: true });
  const accessToken = Cookies.get("token")
  try {
    const res = await api.delete(`/accounts/${account._id}`, {
      headers: {
        'Authorization': `token ${accessToken}`
      }
    });

    Cookies.remove("account");
    Cookies.remove("token");

    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: res.data.msg, type: "success" },
      { root: true }
    );

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: error.message, type: "error" },
      { root: true }
    );
  }
};
</script>

<template>
  <div
    class="account-page min-h-screen flex justify-center items-start bg-white"
  >
    <div
      class="account flex py-12 flex-col justify-center items-center w-[800px]"
    >
      <div class="account-img shadow-md w-44">
        <img
          class="w-full object-cover rounded"
          :src="`https://avatars.dicebear.com/api/initials/${account.fullname}.svg`"
          alt=""
        />
      </div>
      <div class="account-content space-y-6 w-[500px]">
        <div class="input-field w-full mt-6 flex flex-col items-start">
          <label for="fullname">姓名</label>
          <input
            id="fullname"
            v-model="account.fullname"
            type="text"
            class="outline-none border rounded px-6 py-3 w-full"
          />
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <label for="username">用户名</label>
          <input
            id="username"
            v-model="account.username"
            type="text"
            class="outline-none border rounded px-6 py-3 w-full"
          />
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <select
            v-model="account.gender"
            class="outline-none border rounded px-6 py-3 w-full"
          >
            <option :selected="account.gender === 'Male'" value="Male">
              男
            </option>
            <option :selected="account.gender === 'Female'" value="Female">
              女
            </option>
          </select>
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <label for="age">年龄</label>
          <input
            id="age"
            v-model="account.age"
            type="text"
            placeholder="年龄"
            class="outline-none border w-full rounded px-6 py-3"
          />
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <label for="city">城市</label>
          <input
            id="city"
            v-model="account.city"
            type="text"
            placeholder="城市"
            class="outline-none border w-full rounded px-6 py-3"
          />
        </div>
      </div>
      <div
        class="account-buttons w-[500px] flex flex-row justify-between mt-6 items-center"
      >
        <div class="left">
          <button
            @click="updateAccount()"
            :disabled="loading"
            class="save-btn transition hover:bg-sky-600 px-4 py-2 rounded bg-sky-500 text-white disabled:bg-gray-50"
          >
            更新账号信息
          </button>
        </div>
        <div class="right">
          <button
            @click="logOut()"
            :disabled="loading"
            class="logout-btn transition hover:bg-gray-500 px-4 py-2 rounded bg-gray-400 text-white mr-4 disabled:bg-gray-50"
          >
            退出
          </button>
          <button
            @click="deleteAccount()"
            :disabled="loading"
            class="delete-btn transition hover:bg-red-500 px-4 py-2 rounded bg-red-400 text-white disabled:bg-gray-50"
          >
            删除账号
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
