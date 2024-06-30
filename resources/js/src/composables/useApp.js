import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { useAppStore } from "@/store/useAppStore";

export const useApp = () => {
    const { getCookie, removeCookie } = useLogin();
    const token = ref("");
    const appStore = useAppStore();
    const totalTeachers = ref(0);
    const totalStudents = ref(0);
    const presentStudents = ref(0);
    const obsentStudents = ref(0);
    const revenue = ref(0);
    const remain = ref(0);

    const getDataForDashboard = async () => {
        token.value = getCookie("access_token");
        appStore.loading = true;
        await axios
            .get("/api/admin/dashboard/data", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                appStore.loading = false;
                totalTeachers.value = res.data.teachers;
                totalStudents.value = res.data.students;
                presentStudents.value = res.data.presentStudent;
                obsentStudents.value = res.data.obsentStudent;
                revenue.value = res.data.revenue;
                remain.value = res.data.remain;
            })
            .catch((err) => {
                appStore.loading = false;
            });
    };

    const getMonthlyFeeReport = async () => {
        // /fee/monthly/report
        await axios
            .get("/api/fee/monthly/report", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                appStore.loading = false;
                console.log(err);
            });
    };
    return {
        remain,
        revenue,
        getDataForDashboard,
        totalStudents,
        totalTeachers,
        presentStudents,
        obsentStudents,
        getMonthlyFeeReport
    };
};
