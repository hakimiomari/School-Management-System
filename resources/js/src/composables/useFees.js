import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";
import { useAppStore } from "@/store/useAppStore";

export const useFees = () => {
    const token = ref("");
    const students = ref("");
    const loading = ref(false);
    const errors = ref("");
    const isStudent = ref(false);
    const { getCookie, removeCookie } = useLogin();
    const appStore = useAppStore();
    const data = ref("");

    const getData = async (data) => {
        await axios
            .post("/api/class/student/fess_info", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                isStudent.value = true;
                loading.value = false;
                errors.value = "";
                appStore.students = res.data;
            })
            .catch((err) => {
                loading.value = false;
                errors.value = err.response.data.errors;
                appStore.students = "";
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const getClassByMonth = async (formData) => {
        loading.value = true;
        token.value = getCookie("access_token");

        data.value = {
            class_id: formData.class.id,
            date: formData.date,
        };
        getData(data.value);
    };

    const takeFee = async (studentFee) => {
        loading.value = true;
        token.value = getCookie("access_token");

        await axios
            .post("/api/class/student/fee/taking", studentFee, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                errors.value = "";
                appStore.open = false;
                getData(data.value);
                toast("Fee successfully taken", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                loading.value = false;
                errors.value = err.response.data.errors;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    // takeRemain
    const takeRemain = async (studentRemain) => {
        loading.value = true;
        token.value = getCookie("access_token");

        await axios
            .post("/api/class/student/remain/taking", studentRemain, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                loading.value = false;
                errors.value = "";
                appStore.showStatus = false;
                getData(data.value);
                toast("Remain successfully taken", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                loading.value = false;
                errors.value = err.response.data.errors;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    return {
        getClassByMonth,
        loading,
        errors,
        isStudent,
        takeFee,
        takeRemain,
    };
};
