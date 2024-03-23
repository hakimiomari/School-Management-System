import axios from "axios";
import { ref } from "vue";
import { useLogin } from "@/composables/user/useLogin";

export const useUser = () => {
    const token = ref("");
    const data = ref("");
    const imageUrl = ref(null);

    const { getCookie } = useLogin();

    const userInfo = async () => {
        token.value = getCookie("access_token");
        axios
            .get("/api/user", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                data.value = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
    return { userInfo, data, handleFileChange, imageUrl };
};
