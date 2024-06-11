<template>
    <div class="bg-slate-100 p-4 overflow-x-auto">
        <h1 class="text-2xl font-normal">Student Monthly Fees</h1>

        <table
            v-if="studentFees.length > 0"
            class="min-w-full leading-normal mt-4"
        >
            <thead>
                <tr>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        ID
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Year
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Month
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Fee
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Payed
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Remain
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Created At
                    </th>
                </tr>
            </thead>
            <tbody class="w-full">
                <tr v-for="studentFee in studentFees">
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.id }}
                    </td>
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.year }}
                    </td>
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.month }}
                    </td>
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.fee }}
                    </td>
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.payed }}
                    </td>
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.remain }}
                    </td>
                    <td class="px-5 py-2 text-sm border-b border-gray-200">
                        {{ studentFee.created_at }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div
            class="p-2 border-t-2 border-indigo-500"
            v-if="!studentFees.length > 0 && !loading"
        >
            No record found!
        </div>
        <div v-if="loading" class="w-auto mt-4 card">
            <div>
                <DataTable :value="products">
                    <Column field="code" header="ID">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="name" header="GRADE">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="category" header="CLASS">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="CREATED AT">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="STATUS">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="ACTION">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useFees } from "@/composables/useFees";

import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const products = ref(new Array(6));
const { getStudentFee, studentFees, loading } = useFees();
const route = useRoute();

onMounted(() => {
    getStudentFee(route.params.id);
});
</script>
