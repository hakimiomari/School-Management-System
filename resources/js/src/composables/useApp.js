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
    const chartData = ref();
    const loading = ref(false);

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

    // /fee/monthly/report
    const getMonthlyFeeReport = async () => {
        loading.value = true;
        await axios
            .get("/api/fee/monthly/report", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                chartData.value = setChartData(res.data.label, res.data.fees);
            })
            .catch((err) => {
                loading.value = false;
                appStore.loading = false;
            });
    };

    const setChartData = (label, data) => {
        return {
            labels: label,
            datasets: [
                {
                    label: "Fee",
                    data: data,
                    backgroundColor: [
                        "rgba(249, 115, 22, 0.2)",
                        "rgba(6, 182, 212, 0.2)",
                        "rgb(107, 114, 128, 0.2)",
                        "rgba(139, 92, 246 0.2)",
                        "rgba(139, 12, 151 0.2)",
                        "rgba(139, 52, 161 0.2)",
                        "rgba(139, 82, 181 0.2)",
                        "rgba(139, 112, 141 0.2)",
                        "rgba(139,132, 51 0.2)",
                        "rgba(39, 222, 151 0.2)",
                        "rgba(197, 62, 151 0.2)",
                        "rgba(16, 12, 151 0.2)",
                    ],
                    borderColor: [
                        "rgb(249, 115, 22)",
                        "rgb(6, 182, 212)",
                        "rgb(107, 114, 128)",
                        "rgb(139, 92, 246)",
                        "rgb(234, 23, 212)",
                        "rgb(24, 23, 212)",
                        "rgb(123, 73, 212)",
                        "rgb(34, 23, 12)",
                        "rgb(114, 123, 212)",
                        "rgb(24, 123, 112)",
                        "rgb(23, 231, 100)",
                        "rgb(24, 230, 200)",
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    return {
        loading,
        chartData,
        remain,
        revenue,
        getDataForDashboard,
        totalStudents,
        totalTeachers,
        presentStudents,
        obsentStudents,
        getMonthlyFeeReport,
    };
};
