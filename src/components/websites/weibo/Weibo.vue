<template>
    <div class="page-type">
        {{ weibo?.pageType.value }}
    </div>
</template>

<script setup lang="ts">
import { WeiboPlugin } from '@/plugins/weibo';
import { inject } from 'vue';

const weibo = inject<WeiboPlugin>('weibo');
</script>

<style lang="scss">
div.page-type {
    font-size: 0.75rem;
    font-weight: bold;
}
</style>