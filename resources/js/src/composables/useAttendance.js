import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";

export const useAttendance = () => {
    const token = ref("");
    const students = ref("");
    const loading = ref(false);
    const isClass = ref(false);
    const attendances = ref("");
    const errors = ref("");
    const isAttendence = ref(false);
    const { getCookie, removeCookie } = useLogin();

    // get all students
    const index = async (classInof) => {
        token.value = getCookie("access_token");
        isClass.value = true;
        await axios
            .post(
                "/api/student/attendance",
                { class: classInof.class },
                {
                    headers: {
                        Authorization: `Bearer ${token.value}`,
                    },
                }
            )
            .then((res) => {
                isClass.value = false;
                students.value = res.data;
            })
            .catch((err) => {
                isClass.value = false;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    // take attendance
    const takeAttendance = async (students) => {
        loading.value = true;
        token.value = getCookie("access_token");
        await axios
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

    // / classDailyReport
    const classDailyReport = async () => {
        loading.value = true;
        token.value = getCookie("access_token");
        await axios
            .get("/api/attendance/class/daily_report", {
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
            });
    };

    const findStudentMonthlyAttendenceReport = async (data) => {
        loading.value = true;
        token.value = getCookie("access_token");
        await axios
            .post("/api/attendance/student/monthly_report", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                attendances.value = res.data;
            })
            .catch((err) => {
                errors.value = err.response.data.errors;
                loading.value = false;
            });
    };

    // getStudentLastMonthAttendence

    const getStudentLastMonthAttendence = async (id) => {
        isAttendence.value = true;
        token.value = getCookie("access_token");
        await axios
            .get(`/api/attendance/student/last_month/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                isAttendence.value = false;
                attendances.value = res.data;
            })
            .catch((err) => {
                isAttendence.value = false;
            });
    };

    return {
        index,
        students,
        takeAttendance,
        loading,
        isClass,
        classDailyReport,
        findStudentMonthlyAttendenceReport,
        attendances,
        isAttendence,
        errors,
        getStudentLastMonthAttendence,
    };
};
