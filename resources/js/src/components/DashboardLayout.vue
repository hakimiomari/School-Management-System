<script setup>
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
import { userStore } from "@/store/userStore";

const user = userStore();
</script>

<template>
    <div v-if="user.userRole" class="flex h-screen bg-gray-200 font-roboto">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <Header />

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
    <div v-else>
        <!-- <div v-else class="flex h-screen bg-gray-200 font-roboto"> -->
        <div class="loaderr">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<style scoped>
.loaderr {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 1px;
    min-width: 1px;
}

.loaderr {
    --main-color: #5e6fff;
    --highlight-color: #ced3ff;
    --bullet: 25%; /* 50% for round or 0% for square*/
    --size: 7px; /* 7px is standard size */
}

.loaderr span {
    float: left;
    margin: 0 calc(var(--size) / 1.4);
    width: var(--size);
    height: var(--size);
    transition: transform 0.2s ease-in-out, background 0.2s ease;
    -webkit-transition: transform 0.2s ease-in-out, background 0.2s ease;
    -moz-transition: transform 0.2s ease-in-out, background 0.2s ease;
    animation-iteration-count: infinite;
    animation-name: highlight;
    animation-duration: 1.2s;
    border-radius: var(--bullet);
    background: var(--main-color);
}

.loaderr span:nth-of-type(1) {
    animation-delay: 0s;
}

.loaderr span:nth-of-type(2) {
    animation-delay: 0.1s;
}

.loaderr span:nth-of-type(3) {
    animation-delay: 0.2s;
}

.loaderr span:nth-of-type(4) {
    animation-delay: 0.3s;
}

.loaderr span:nth-of-type(5) {
    animation-delay: 0.4s;
}

.loaderr span:nth-of-type(6) {
    animation-delay: 0.5s;
}

.loaderr span:nth-of-type(7) {
    animation-delay: 0.6s;
}

.loaderr span:nth-of-type(8) {
    animation-delay: 0.7s;
}

.loaderr span:nth-of-type(9) {
    animation-delay: 0.8s;
}

.loaderr span:nth-of-type(10) {
    animation-delay: 0.9s;
}

.loaderr span:nth-of-type(11) {
    animation-delay: 1s;
}

.loaderr span:nth-of-type(12) {
    animation-delay: 1.1s;
}

@keyframes highlight {
    0% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(2.1, 2.1);
        background: var(--highlight-color);
    }
    100% {
        transform: scale(1, 1);
    }
}
</style>
