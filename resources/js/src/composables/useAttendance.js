import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";

export const useAttendance = () => {
    const token = ref("");
    const students = ref("");
    const { getCookie, removeCookie } = useLogin();
    const index = async () => {
        token.value = getCookie("access_token");
        await axios
            .get("/api/student/attendance", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                students.value = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // take attendance
    const takeAttendance = (students) => {
        token.value = getCookie("access_token");
        axios
            .post("/api/attendance/take", students, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                toast("Attendance successfully taken", {
                    theme: "auto",
                    type: "success",
                    autoClose: 3000,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                if (err.response.status == 403) {
                    toast("It's not time to take Attendance", {
                        theme: "auto",
                        type: "error",
                        autoClose: 3000,
                        dangerouslyHTMLString: true,
                        zIndex: 9999,
                    });
                }
                if (err.response.status == 405) {
                    toast("Attendance already token", {
                        theme: "auto",
                        type: "error",
                        autoClose: 3000,
                        dangerouslyHTMLString: true,
                        zIndex: 9999,
                    });
                }
            });
    };
    return { index, students, takeAttendance };
};
