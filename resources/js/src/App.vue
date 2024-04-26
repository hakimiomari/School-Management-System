<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import "vue3-toastify/dist/index.css";
import { useUser } from "@/composables/user/useUser";

const defaultLayout = "default";
const { userInfo } = useUser();
const { currentRoute } = useRouter();

const layout = computed(
    () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
onMounted(() => {
    userInfo();
    const iconPath = "/storage/assets/logo/logo.png";
    const iconLink = document.querySelector('link[rel="icon"]');

    // Create a new link element for the favicon
    const newIconLink = document.createElement("link");
    newIconLink.rel = "icon";
    newIconLink.href = iconPath;

    // Replace the existing icon link with the new one
    if (iconLink) {
        iconLink.parentNode.replaceChild(newIconLink, iconLink);
    } else {
        document.head.appendChild(newIconLink);
    }
});
</script>

<template>
    <component :is="layout">
        <router-view />
    </component>
</template>
