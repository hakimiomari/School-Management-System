<template>
    <div class="p-4 bg-white rounded">
        <h1 class="text-2xl">Student Attendence</h1>
        <div class="flex w-full flex-wrap items-center mt-4">
            <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlfor="grid-password"
                    >
                        Date
                    </label>
                    <input
                        type="date"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        v-model="data.date"
                    />
                    <p v-if="errors?.date" class="text-xs mt-1 text-red-500">
                        {{ errors?.date[0] }}
                    </p>
                </div>
            </div>
            <div class="flex lg:w-3/12 mx-4 lg:m-0 justify-center">
                <button
                    @click="findStudentMonthlyAttendenceReport(data)"
                    class="rounded py-2 mt-4 px-6 cursor-pointer bg-slate-800 text-white"
                    :disabled="loading"
                >
                    <span v-if="loading">
                        <svg
                            aria-hidden="true"
                            role="status"
                            class="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        Searching...
                    </span>
                    <span v-else> Search </span>
                </button>
            </div>
        </div>
    </div>
    <div class="p-4 mt-4 rounded bg-white overflow-x-auto">
        <div class="flex justify-between">
            <h1 class="text-xl font-bold mb-4">Student Attendance Report</h1>
            <h1 class="text-2xl font-bold mb-4 cursor-pointer">🖨️</h1>
        </div>
        <table v-if="attendances.length > 0" class="min-w-full leading-normal">
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
                        In
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Out
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Persain Date
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Created At
                    </th>
                    <th
                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                    >
                        Updated At
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="attendance in attendances">
                    <td
                        class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                    >
                        {{ attendance.id }}
                    </td>
                    <td
                        class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                    >
                        <span v-if="attendance.in == 'Present'">✅</span>
                        <span v-if="attendance.in == 'Obsent'">❌</span>
                        <span v-if="attendance.in == 'Leave'">🏫</span>
                    </td>
                    <td
                        class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                    >
                        <span v-if="attendance.out">
                            <span v-if="attendance.out == 'Present'">✅</span>
                            <span v-if="attendance.out == 'Obsent'">❌</span>
                            <span v-if="attendance.out == 'Leave'">🏫</span>
                        </span>
                        <span v-else>Null</span>
                    </td>
                    <td
                        class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                    >
                        {{ attendance.persainYear }}
                    </td>
                    <td
                        class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                    >
                        {{ attendance.created_at }}
                    </td>
                    <td
                        class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                    >
                        {{ attendance.updated_at }}
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- skeleton -->
        <div v-if="!attendances.length > 0 && isAttendence" class="w-auto">
            <div class="card">
                <DataTable :value="round">
                    <Column field="code" header="ID">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="category" header="In">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="Out">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="Persain Date">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="Created At">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                    <Column field="quantity" header="Updated At">
                        <template #body>
                            <Skeleton class="py-4"></Skeleton>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div
            class="p-2 border-t-2 w-full flex border-indigo-500"
            v-if="!attendances.length > 0 && !isAttendence"
        >
            <span>No record found!</span>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAttendance } from "@/composables/useAttendance";
import { useRoute } from "vue-router";
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const round = ref(new Array(6));
const route = useRoute();
const {
    getStudentLastMonthAttendence,
    loading,
    findStudentMonthlyAttendenceReport,
    attendances,
    isAttendence,
    errors,
} = useAttendance();

const data = ref({
    date: "",
    id: route.params.id,
});

const counter = ref({
    present: 0,
    obsent: 0,
    leave: 0,
});

onMounted(() => {
    getStudentLastMonthAttendence(route.params.id);
});
</script>
