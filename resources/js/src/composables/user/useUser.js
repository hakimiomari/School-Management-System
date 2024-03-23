import axios from "axios";
import { ref } from "vue";

export const useUser = () => {
    const token = ref("");
    const data = ref("");

    const userInfo = async () => {
        token.value = JSON.parse(localStorage.getItem("access_token"));
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
    return { userInfo, data };
};
