import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const useLogin = () => {
    const router = useRouter();
    const errors = ref("");
    const loading = ref(false);

    const login = async (form) => {
        loading.value = true;
        await axios.get("/sanctum/csrf-cookie");
        await axios
            .post("/api/user", {
                email: form.email,
                password: form.password,
            })
            .then((res) => {
                loading.value = false;
                router.push("/dashboard");
            })
            .catch((err) => {
                loading.value = false;
                if (err.response.status == 401) {
                    toast(err.response.data, {
                        theme: "auto",
                        type: "error",
                        autoClose: 1500,
                        dangerouslyHTMLString: true,
                    });
                }
                errors.value = err.response.data.errors;
            });
    };

    return { login, errors, loading };
};
