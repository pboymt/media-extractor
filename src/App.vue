<script setup lang="ts">
import { ref, onMounted } from 'vue';
import extractionLogo from './assets/extraction.svg';
import closeLogo from './assets/close.svg';
import Window from './components/Window.vue';
import { inject } from 'vue';
import { Weibo } from './plugins/weibo';

const opened = ref(true);
const url = ref('');
const weibo = inject<Weibo>('weibo');

function toggle() {
  opened.value = !opened.value;
}

onMounted(() => {
});
</script>

<template>
  <div class="plugin-button" @click="toggle">
    <img :src="opened ? closeLogo : extractionLogo" class="logo" :class="{ opened: opened }">
  </div>
  <Window :opened="opened" :url="weibo?.pageType.value"></Window>
</template>

<style lang="scss">
.plugin-button {
  position: fixed;
  right: 0;
  bottom: 1rem;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--border-color);
  border-right: none;
  border-radius: 0.25rem 0 0 0.25rem;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  img {
    width: 1.5rem;
    filter: invert(1);
    opacity: 0.5;
    transition: transform 0.2s ease-in-out;

    &:hover {
      opacity: 1;
    }

    &.opened {
      transform: rotate(180deg);
    }
  }
}
</style>
