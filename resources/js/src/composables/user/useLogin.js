import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { userStore } from "@/store/userStore";

export const useLogin = () => {
    const user = userStore();
    const router = useRouter();
    const errors = ref("");
    const loading = ref(false);
    
    const token = ref("");

    const login = async (form) => {
        loading.value = true;
        await axios.get("/sanctum/csrf-cookie");
        await axios
            .post("/api/login", {
                email: form.email,
                password: form.password,
            })
            .then((res) => {
                user.userData = res.data.user;
                loading.value = false;
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(res.data.token)
                );
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

    const logout = async () => {
        token.value = JSON.parse(localStorage.getItem("access_token"));
        axios
            .get("/api/logout", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                localStorage.removeItem("access_token");
                router.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return { logout, login, errors, loading };
};
