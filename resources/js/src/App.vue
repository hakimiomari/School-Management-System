<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const defaultLayout = "default";
import "vue3-toastify/dist/index.css";

const { currentRoute } = useRouter();

const layout = computed(
    () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>

<template>
    <component :is="layout">
        <router-view />
    </component>
</template>
