import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export const useTeacher = () => {
    const data = new FormData();

    const token = ref("");
    const router = useRouter();
    const appStore = useAppStore();
    const errors = ref("");
    const { getCookie, removeCookie } = useLogin();

    const addTeacher = async (form_data, file) => {
        appStore.loading = true;
        token.value = getCookie("access_token");

        data.append("name", form_data.name);
        data.append("father_name", form_data.father_name);
        data.append("email", form_data.email);
        data.append("degree", form_data.degree.name);
        data.append("date_of_birth", form_data.dob);
        data.append("gender", form_data.gender.name);
        data.append("address", form_data.address);
        data.append("contact", form_data.contact);
        data.append("photo", file);

        await axios
            .post("/api/teacher/add", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                appStore.loading = false;
                errors.value = "";
                router.push({ name: "TeacherList" });
                toast("Teacher successfully Registered", {
                    theme: "auto",
                    type: "success",
                    autoClose: 5000,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                appStore.loading = false;
                errors.value = err.response.data.errors;
            });
    };

    // delete teacher
    const deleteTeacher = async (id) => {
        token.value = getCookie("access_token");
        Swal.fire({
            title: "Deleting Teacher!",
            html: "Deleting teacher is on the process",
            didOpen: () => {
                Swal.showLoading();
            },
        });
        await axios
            .delete(`/api/teacher/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                Swal.close();
                appStore.getData(
                    `${appStore.url}?page=${appStore.current_page}`
                );
                toast("Teacher successfully Deleted!", {
                    theme: "auto",
                    type: "success",
                    autoClose: 2000,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
                errors.value = err.response.data.errors;
            });
    };

    return { addTeacher, errors, deleteTeacher };
};
