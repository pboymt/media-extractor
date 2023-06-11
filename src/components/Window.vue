<template>
    <div class="plugin-window" :class="{ closed: !opened }">
        {{ url ?? '' }}
    </div>
</template>

<script setup lang="ts">
interface Props {
    opened: boolean;
    url?: string;
}

withDefaults(defineProps<Props>(), {
    opened: false,
    url: undefined,
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

    &.closed {
        transform: translateX(150%);
    }
}
</style>