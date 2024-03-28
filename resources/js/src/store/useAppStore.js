import { defineStore } from "pinia";
import { ref } from "vue";
import { useLogin } from "@/composables/user/useLogin";

export const useAppStore = defineStore("app", () => {
    const open = ref(false);
    const loading = ref(false);
    const current_page = ref("");
    const last_page = ref("");
    const next_page_url = ref("");
    const prev_page_url = ref("");
    const paginatedData = ref("");
    const total = ref("");
    const asPerPage = ref("");
    const url = ref("");

    const token = ref("");
    const { getCookie, removeCookie } = useLogin();

    const getData = async (baseUrl) => {
        token.value = getCookie("access_token");
        await axios
            .get(baseUrl, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                paginatedData.value = res.data.data;
                next_page_url.value = res.data.next_page_url;
                prev_page_url.value = res.data.prev_page_url;
                last_page.value = res.data.last_page;
                current_page.value = res.data.current_page;
                total.value = res.data.total;
                asPerPage.value = res.data.to;
            })
            .catch((err) => {
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const onPageChange = async (page) => {
        current_page.value = page;
        await getData(`${url.value}?page=${current_page.value}`);
    };

    return {
        url,
        current_page,
        last_page,
        next_page_url,
        prev_page_url,
        paginatedData,
        total,
        asPerPage,
        getData,
        onPageChange,
        loading,
        open,
    };
});
