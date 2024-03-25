import axios from "axios";
import { ref } from "vue";
import { useLogin } from "@/composables/user/useLogin";
import { userStore } from "@/store/userStore";

export const useUser = () => {
    const token = ref("");
    const data = ref("");
    const imageUrl = ref(null);
    const user = userStore();

    const { getCookie, removeCookie } = useLogin();

    // used for getting user information
    const userInfo = async () => {
        token.value = getCookie("access_token");
        await axios
            .get("/api/user", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                data.value = res.data;
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    removeCookie();
                }
            });
    };

    // used for getting user role
    const getUserRole = async (access_token) => {
        const response = await axios.get("/api/user/role", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response;
        // .then((res) => {
        //     user.isAuthenticated = true;
        //     user.userRole = res.data;
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
    };

    // handle change function using for live preview of images
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imageUrl.value = e.target.result;
            };

            reader.readAsDataURL(file);
        } else {
            imageUrl.value = null;
        }
    };
    return { userInfo, data, handleFileChange, imageUrl, getUserRole };
};
