import axios from "axios";
import { useLogin } from "@/composables/user/useLogin";
import { ref } from "vue";
import Swal from "sweetalert2";

export const useGeneral = async () => {
    const { getCookie, removeCookie } = useLogin();

    const token = ref("");

    const deleteFunction = (id, url) => {
        token.value = getCookie("access_token");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(url, {
                        headers: {
                            Authorization: `Bearer ${token.value}`,
                        },
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    };
    return { deleteFunction };
};
