<template>
  <div
    class="landing min-h-screen w-full flex flex-col justify-center items-center"
  >
    <div class="bg-white min-w-[400px] text-center border-2 rounded p-5">
      <h1 class="landing-title font-bold text-sky-500 text-3xl">
        欢迎来到我的书店!
      </h1>
      <p class="landing-desc mt-4 opacity-70">
        你喜欢的在这里.
      </p>
      <div class="landing-links mt-8 space-x-4">
        <router-link
          to="/register"
          class="bg-sky-500 transition border border-sky-500 text-white rounded p-2 px-4 hover:bg-sky-600 hover:border-sky-600"
          >注册</router-link
        >
        <router-link
          to="/login"
          class="bg-white border transition rounded p-2 px-4 hover:bg-gray-100"
          >登录</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style></style>
