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
                console.log(res);
                totalTeachers.value = res.data.teachers;
                totalStudents.value = res.data.students;
                presentStudents.value = res.data.presentStudent;
                obsentStudents.value = res.data.obsentStudent;
            })
            .catch((err) => {
                appStore.loading = false;
                console.log(err);
            });
    };
    return {
        getDataForDashboard,
        totalStudents,
        totalTeachers,
        presentStudents,
        obsentStudents,
    };
};
