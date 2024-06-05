import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { toast } from "vue3-toastify";
import { useAppStore } from "@/store/useAppStore";

export const useClass = () => {
    const token = ref("");
    const errors = ref("");
    const appStore = useAppStore();
    const { getCookie, removeCookie } = useLogin();
    const gradeClasses = ref("");
    const grades = ref("");

    const addClass = async (data) => {
        const newData = {
            grade: data.grade.name,
            class: data.class,
            fee: data.fee,
            teacher: data.teacher.id,
        };
        appStore.loading = true;
        token.value = getCookie("access_token");
        await axios
            .post("/api/class/store", newData, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                appStore.loading = false;
                appStore.open = false;
                appStore.onPageChange(appStore.current_page);
                errors.value = "";
                toast("Class successfully Added", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                });
            })
            .catch((err) => {
                appStore.loading = false;
                errors.value = err.response.data.errors;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const updateStatus = async (data) => {
        token.value = getCookie("access_token");
        appStore.loading = true;
        await axios
            .patch("/api/class/update/status", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                appStore.loading = false;
                appStore.showStatus = false;
                appStore.onPageChange(appStore.current_page);
                toast("Status successfully Changed", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                });
            })
            .catch((err) => {
                appStore.showStatus = false;
                appStore.loading = false;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const deleteClass = async (id) => {
        token.value = getCookie("access_token");
        await axios
            .delete(`/api/class/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                appStore.onPageChange(appStore.current_page);
                toast("Class successfully Deleted!", {
                    theme: "auto",
                    type: "success",
                    autoClose: 1500,
                    dangerouslyHTMLString: true,
                });
            })
            .catch((err) => {
                if (err.response.status == 422) {
                    toast("Sorry! Class not found", {
                        theme: "auto",
                        type: "error",
                        autoClose: 1500,
                        dangerouslyHTMLString: true,
                    });
                }
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const selectClass = async (grade) => {
        token.value = getCookie("access_token");
        await axios
            .get(`/api/grade/class/${grade}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                gradeClasses.value = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getGrades = async () => {
        token.value = getCookie("access_token");
        await axios
            .get("/api/grade/all", {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                grades.value = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return {
        grades,
        getGrades,
        gradeClasses,
        selectClass,
        deleteClass,
        addClass,
        errors,
        updateStatus,
    };
};
