import { defineStore } from "pinia";
import { ref } from "vue";

export const userStore = defineStore("user", () => {
    const userData = ref("");
    const userRole = ref("");
    const isAuthenticated = ref(false);
    const isEdit = ref(true);
    const loading = ref(false);
    const userImage = ref("");

    return {
        userImage,
        loading,
        isAuthenticated,
        userData,
        userRole,
        isEdit,
    };
});
