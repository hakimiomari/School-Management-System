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
    const token = ref("");

    // Function to set a cookie with an expiration time
    const setCookie = (name, value, expirationDays) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);

        const expires = "expires=" + expirationDate.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };

    // Function to get the value of a cookie by its name
    const getCookie = (name) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Check if the cookie starts with the provided name
            if (cookie.startsWith(name + "=")) {
                // Extract and return the cookie value
                return cookie.substring(name.length + 1);
            }
        }
        // Return null if the cookie is not found
        return null;
    };

    // Function to remove a cookie by its name
    const removeCookie = (name) => {
        document.cookie =
            name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        user.userRole = "";
        router.push("/");
    };

    const login = async (form) => {
        user.loading = true;
        await axios.get("/sanctum/csrf-cookie");
        await axios
            .post("/api/login", {
                email: form.email,
                password: form.password,
            })
            .then((res) => {
                user.userData = res.data.user;
                user.userRole = res.data.role;
                user.loading = false;
                router.push("/dashboard");
                setCookie("access_token", res.data.token, 90);
            })
            .catch((err) => {
                user.loading = false;
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
        token.value = getCookie("access_token");
        await axios
            .get("/api/logout", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                removeCookie("access_token");
            })
            .catch((err) => {
                removeCookie("access_token");
            });
    };
    return {
        logout,
        login,
        errors,
        setCookie,
        getCookie,
        removeCookie,
    };
};
