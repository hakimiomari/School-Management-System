import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";
import { useAppStore } from "@/store/useAppStore";

export const useClass = () => {
    const token = ref("");
    const errors = ref("");
    const appStore = useAppStore();
    const { getCookie, removeCookie } = useLogin();

    const addClass = async (data) => {
        appStore.loading = true;
        token.value = getCookie("access_token");
        await axios
            .post("/api/class/store", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                appStore.loading = false;
                appStore.open = false;
                appStore.onPageChange(appStore.current_page);
                errors.value = "";
                toast("Class successfully Added", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
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
    return {
        addClass,
        errors,
    };
};
