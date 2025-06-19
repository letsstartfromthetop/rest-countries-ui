<script setup>
import {ref} from 'vue'

const userTheme = ref('');

if (localStorage.getItem("user-theme")) {
  userTheme.value = localStorage.getItem("user-theme")
  document.documentElement.className = userTheme.value;
} else {
  userTheme.value = 'light-theme'
}

const setTheme = function () {
  userTheme.value === 'light-theme' ? userTheme.value = 'dark-theme' : userTheme.value = 'light-theme';
  localStorage.setItem("user-theme", userTheme.value);
  document.documentElement.className = userTheme.value;
}
</script>
<template>
  <header>
    <div class="header-content flex justify-between items-center">
      <div class="font-bold text-xl"> Where in the world?</div>
      <div class="font-bold cursor-pointer" @click="setTheme()"><i class="fa-regular fa-moon mr-3"></i>Dark Mode</div>
    </div>


  </header>
</template>


<style>
header {
  height: 80px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 48px;
}

.header-content {
  padding: 20px 80px;
  height: 80px;
  max-width: 1440px;
  margin: 0 auto;
}
</style>
