<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

</script>

<template>
  <nav class="container-fluid bg-white p-3">
    <div class="row">
      <div class="col-6">
        <router-link :to="{ name: 'Home' }">
          <div class="align-items-center">
            <img class="logo pb-1" src="https://www.pngall.com/wp-content/uploads/5/Cell-Tower-Transparent.png" alt="">
          </div>
        </router-link>
      </div>
      <div class="col-6"> 
        <div class="align-items-center float-end">
          <Login />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

/* @media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
} */

.logo{
  height: 55px;
  aspect-ratio: 1/1;
  border-radius: 50em;
  object-fit: cover;
  object-position: center;
}
</style>
