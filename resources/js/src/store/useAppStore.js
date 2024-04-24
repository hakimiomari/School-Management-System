import { defineStore } from "pinia";
import { ref } from "vue";
import { useLogin } from "@/composables/user/useLogin";

export const useAppStore = defineStore("app", () => {
    const page = JSON.parse(localStorage.getItem("page"));
    const open = ref(false);
    const showStatus = ref(false);
    const loading = ref(false);
    const current_page = ref("");
    current_page.value = page ? page : 1;
    const last_page = ref("");
    const next_page_url = ref("");
    const prev_page_url = ref("");
    const paginatedData = ref("");
    const total = ref("");
    const asPerPage = ref("");
    const url = ref("");
    const displayedPages = ref("");
    const paginatedLoader = ref(false);

    const token = ref("");
    const { getCookie, removeCookie } = useLogin();

    const getData = async (baseUrl) => {
        token.value = getCookie("access_token");
        localStorage.setItem("page", JSON.stringify(current_page.value));
        paginatedLoader.value = true;
        await axios
            .get(`${baseUrl}?page=${current_page.value}`, {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            })
            .then((res) => {
                paginatedLoader.value = false;
                paginatedData.value = res.data.data;
                next_page_url.value = res.data.next_page_url;
                prev_page_url.value = res.data.prev_page_url;
                last_page.value = res.data.last_page;
                current_page.value = res.data.current_page;
                total.value = res.data.total;
                asPerPage.value = res.data.to;
                DisplayedPages();
            })
            .catch((err) => {
                paginatedLoader.value = false;
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const onPageChange = async (page) => {
        DisplayedPages();
        current_page.value = page;
        await getData(`${url.value}`);
    };

    // Display pages
    const DisplayedPages = () => {
        let pagesToShow = [];

        if (last_page.value <= 5) {
            pagesToShow = Array.from(
                { length: last_page.value },
                (_, index) => index + 1
            );
        } else {
            if (current_page.value <= 3) {
                pagesToShow = [1, 2, 3, 4, "...", last_page.value];
            } else if (current_page.value >= last_page.value - 2) {
                pagesToShow = [
                    1,
                    "...",
                    last_page.value - 3,
                    last_page.value - 2,
                    last_page.value - 1,
                    last_page.value,
                ];
            } else {
                pagesToShow = [
                    1,
                    "...",
                    current_page.value - 1,
                    current_page.value,
                    current_page.value + 1,
                    "...",
                    last_page.value,
                ];
            }
        }
        displayedPages.value = pagesToShow;
    };

    return {
        showStatus,
        paginatedLoader,
        displayedPages,
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
