import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "vue3-toastify";

export const useRoom = () => {
    const token = ref("");
    const appStore = useAppStore();
    const { getCookie, removeCookie } = useLogin();

    const errors = ref("");

    const store = async (roomData) => {
        token.value = getCookie("access_token");
        appStore.loading = true;

        await axios
            .post("/api/school/room/store", roomData, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                errors.value = "";
                appStore.loading = false;
                appStore.open = false;
                appStore.onPageChange(appStore.current_page);
                toast("Room successfully Added", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                appStore.loading = false;
                errors.value = err.response.data.errors;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    return { store, errors };
};
