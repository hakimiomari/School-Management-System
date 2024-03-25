import axios from "axios";
import { ref } from "vue";
import { useLogin } from "@/composables/user/useLogin";
import { userStore } from "@/store/userStore";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const useUser = () => {
    const token = ref("");
    const data = ref("");
    const imageUrl = ref(null);
    const file = ref(null);
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
                    removeCookie("access_token");
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
    };

    // handle change function using for live preview of images
    const handleFileChange = (event) => {
        file.value = event.target.files[0];
        if (file.value) {
            const reader = new FileReader();

            reader.onload = (e) => {
                imageUrl.value = e.target.result;
            };

            reader.readAsDataURL(file.value);
        } else {
            imageUrl.value = null;
        }
    };

    const updateProfile = async (info, userFile) => {
        user.loading = true;
        token.value = getCookie("access_token");
        const formData = new FormData();
        formData.append("id", info.id);
        formData.append("file", userFile);
        formData.append("name", info.name);
        formData.append("email", info.email);
        formData.append("profession", info.profession);
        formData.append("bio", info.bio);

        await axios
            .post("/api/user/update", formData, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                user.loading = false;
                toast("Profile successfully updated!", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                });
                user.isEdit = true;
                data.value = res.data;
            })
            .catch((err) => {
                user.loading = false;
                user.isEdit = true;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    return {
        userInfo,
        data,
        handleFileChange,
        imageUrl,
        file,
        getUserRole,
        updateProfile,
    };
};
