<template>
    <div class="plugin-window" :class="{ closed: !opened }">
        <div class="window-title">
            Media Extractor - {{ website }}
        </div>
        <div class="window-content">
            <Weibo v-if="website === Website.Weibo"></Weibo>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { WeiboPlugin } from '@/plugins/weibo';
import { onMounted } from 'vue';
import { checkWebsite, Website } from '@/plugins/website';
import { ref } from 'vue';
import Weibo from '@/components/websites/weibo/Weibo.vue';

const weibo = inject<WeiboPlugin>('weibo');
const website = ref('未知网站');

interface Props {
    opened: boolean;
    url?: string;
}

withDefaults(defineProps<Props>(), {
    opened: false,
    url: undefined,
});

onMounted(() => {
    website.value = checkWebsite();
});
</script>

<style lang="scss">
.plugin-window {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 1rem;
    bottom: 4rem;
    top: 4rem;
    min-height: 5rem;
    border-radius: 0.5rem;
    width: 15rem;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    transition: transform 0.2s ease-in-out;

    // z-index: 999999;

    &.closed {
        transform: translateX(150%);
    }

    div.window-title {
        height: 2rem;
        display: flex;
        align-items: center;
        padding: 0 0.5rem;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.75rem;
        color: var(--text-color);
        user-select: none;
    }
}
</style>