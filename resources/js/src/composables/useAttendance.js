import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";

export const useAttendance = () => {
    const token = ref("");
    const students = ref("");
    const loading = ref(false);
    const { getCookie, removeCookie } = useLogin();

    // get all students
    const index = async () => {
        token.value = getCookie("access_token");
        loading.value = true;
        await axios
            .get("/api/student/attendance", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                students.value = res.data;
            })
            .catch((err) => {
                loading.value = false;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    // take attendance
    const takeAttendance = (students) => {
        loading.value = true;
        token.value = getCookie("access_token");
        axios
            .post("/api/attendance/take", students, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                toast("Attendance successfully taken", {
                    theme: "auto",
                    type: "success",
                    autoClose: 3000,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                loading.value = false;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
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
    return { index, students, takeAttendance, loading };
};
