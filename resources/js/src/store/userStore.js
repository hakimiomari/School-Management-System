import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("user", () => {
    const userData = ref("");
    return {
        userData,
    };
});
