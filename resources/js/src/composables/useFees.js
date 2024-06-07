import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";

export const useFees = () => {
    const token = ref("");
    const students = ref("");
    const loading = ref(false);
    const errors = ref("");
    const { getCookie, removeCookie } = useLogin();

    const getClassByMonth = async (formData) => {
        loading.value = true;
        token.value = getCookie("access_token");

        const data = {
            class_id: formData.class.id,
            month: formData.month.name,
        };
        await axios
            .post("/api/class/student/fess_info", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                errors.value = "";
                console.log(res);
                students.value = res.data;
            })
            .catch((err) => {
                loading.value = false;
                errors.value = err.response.data.errors;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    return { getClassByMonth, loading, errors,students };
};
