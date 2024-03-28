import { ref } from "vue";
import { useLogin } from "@/composables/user/useLogin";

export const usePagination = () => {
    const current_page = ref("");
    const last_page = ref("");
    const first_page_url = ref("");
    const next_page_url = ref("");
    const prev_page_url = ref("");
    const paginatedData = ref("");
    const total = ref("");
    const asPerPage = ref("");

    const token = ref("");
    const { getCookie, removeCookie } = useLogin();

    const getData = async (url) => {
        token.value = getCookie("access_token");
        await axios
            .get(url, {
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
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                if (err.response.status == 401) {
                    removeCookie("access_token");
                }
            });
    };

    const onPageChange = async (page, url) => {
        current_page.value = page;
        await getData(`${url}?page=${current_page.value}`);
    };

    return {
        onPageChange,
        getData,
        total,
        asPerPage,
        paginatedData,
        current_page,
        last_page,
        first_page_url,
        next_page_url,
        prev_page_url,
    };
};
