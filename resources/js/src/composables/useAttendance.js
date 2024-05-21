import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";

export const useAttendance = () => {
    const token = ref("");
    const students = ref("");
    const { getCookie, removeCookie } = useLogin();
    const index = async () => {
        //     token.value = getCookie("access_token");
        //     await axios
        //         .get("/api/student/attendance", {
        //             headers: {
        //                 Authorization: `Bearer ${token.value}`,
        //             },
        //         })
        //         .then((res) => {
        //             students.value = res.data;
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
    };
    return { index, students };
};
