import { ref } from "vue";
import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export const useStudent = () => {
    const token = ref("");
    const router = useRouter();
    const appStore = useAppStore();
    const data = new FormData();
    const errors = ref("");
    const { getCookie, removeCookie } = useLogin();
    const addStudent = async (studentData, file) => {
        token.value = getCookie("access_token");
        appStore.loading = true;

        data.append("photo", file);
        data.append("name", studentData.name);
        data.append("parent_name", studentData.father_name);
        data.append("email", studentData.email);
        data.append("gender", studentData.gender.name);
        data.append("date_of_birth", studentData.dob);
        data.append("address", studentData.address);
        data.append("contact_number", studentData.contact_number);
        data.append("grade_level", studentData.grade_level);
        data.append("class", studentData.class.id);

        await axios
            .post("/api/student/add-new-student", data, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                errors.value = "";
                appStore.loading = false;
                router.push({ name: "StudentList" });
                toast("Student successfully Registered", {
                    theme: "auto",
                    type: "success",
                    autoClose: 3000,
                    dangerouslyHTMLString: true,
                    zIndex: 9999,
                });
            })
            .catch((err) => {
                appStore.loading = false;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
                errors.value = err.response.data.errors;
            });
    };

    // delete student
    const deleteStudent = async (id) => {
        token.value = getCookie("access_token");
        Swal.fire({
            title: "Deleting Student!",
            html: "Deleting student is on the process",
            didOpen: () => {
                Swal.showLoading();
            },
        });
        await axios
            .delete(`/api/student/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                Swal.close();
                appStore.getData(appStore.url);
                toast("Student successfully Deleted!", {
                    theme: "auto",
                    type: "success",
                    autoClose: 3000,
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
    return { addStudent, errors, deleteStudent };
};
