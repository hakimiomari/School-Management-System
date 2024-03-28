<template>
    <div
        class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between"
    >
        <span class="text-xs text-gray-900 xs:text-sm"
            >Showing 1 to {{ asPerPage }} of {{ total }} Entries</span
        >

        <div class="inline-flex mt-2 xs:mt-0">
            <button
                :disabled="current_page == 1"
                :class="
                    current_page == 1
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                "
                @click="appStore.getData(prev_page_url)"
                class="px-4 py-2 text-sm font-semibold rounded-l"
            >
                Prev
            </button>
            <div v-for="page in displayedPages" key="page">
                <button
                    @click="appStore.onPageChange(page)"
                    :class="[
                        current_page == page
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : page != '...'
                            ? 'bg-slate-100 text-gray-800 hover:bg-indigo-700 hover:text-white'
                            : '',
                    ]"
                    class="px-4 py-2 mx-1 text-sm font-semibold rounded-l"
                    :disabled="page == '...'"
                >
                    {{ page }}
                </button>
            </div>
            <button
                :disabled="current_page == last_page"
                :class="
                    current_page == last_page
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                "
                @click="appStore.getData(next_page_url)"
                class="px-4 py-2 text-sm font-semibold rounded-r"
            >
                Next
            </button>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useAppStore } from "@/store/useAppStore";

const appStore = useAppStore();
const current_page = computed(() => appStore.current_page);
const last_page = computed(() => appStore.last_page);
const prev_page_url = computed(() => appStore.prev_page_url);
const next_page_url = computed(() => appStore.next_page_url);
const total = computed(() => appStore.total);
const asPerPage = computed(() => appStore.asPerPage);
const displayedPages = computed(() => appStore.displayedPages);
</script>
