<template>
    <div>
        <div class="mt-3">
            <h2 class="text-xl font-semibold leading-tight text-gray-700">
                Students
            </h2>

            <div class="flex justify-between mt-3 items-center">
                <div class="flex flex-col sm:flex-row w-full sm:w-auto">
                    <div class="flex justify-between mb-2">
                        <div class="flex">
                            <div class="relative">
                                <select
                                    class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border border-gray-400 rounded-l appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                </select>

                                <div
                                    class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
                                >
                                    <svg
                                        class="w-4 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div class="relative">
                                <select
                                    class="block w-full h-full px-4 py-2 pr-8 leading-tight text-gray-700 bg-white border-t border-b border-r border-gray-400 rounded-r appearance-none sm:rounded-r-none sm:border-r-0 focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                >
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>

                                <div
                                    class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
                                >
                                    <svg
                                        class="w-4 h-4 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                @click="router.push({ name: 'AddStudent' })"
                                type="button"
                                class="text-white sm:hidden bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                            >
                                Add new student
                            </button>
                        </div>
                    </div>
                    <div class="relative block mt-2 sm:mt-0">
                        <span
                            class="absolute inset-y-0 left-0 flex items-center pl-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                class="w-4 h-4 text-gray-500 fill-current"
                            >
                                <path
                                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                                />
                            </svg>
                        </span>

                        <input
                            placeholder="Search"
                            class="block w-full py-2 pl-8 pr-6 text-sm text-gray-700 placeholder-gray-400 bg-white border border-b border-gray-400 rounded-l rounded-r appearance-none sm:rounded-l-none focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    @click="router.push({ name: 'AddStudent' })"
                    type="button"
                    class="text-white mb-1 hidden sm:block bg-indigo-700 hover:bg-indigo-800 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                    Add new student
                </button>
            </div>

            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div
                    class="inline-block min-w-full overflow-hidden rounded-lg shadow"
                >
                    <ProgressBar
                        v-if="paginatedLoader && paginatedData.length > 0"
                        mode="indeterminate"
                        style="height: 4px; top: 45px"
                    ></ProgressBar>
                    <table
                        v-if="paginatedData.length > 0"
                        class="min-w-full leading-normal"
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
                                    Photo
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Name
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Father Name
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Grade
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Email
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Attendence
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Fees
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody class="w-full">
                            <tr
                                v-for="(student, index) in paginatedData"
                                :key="index"
                            >
                                <td
                                    class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                                >
                                    {{ student.id }}
                                </td>
                                <td
                                    class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                                >
                                    <p class="text-gray-900 whitespace-nowrap">
                                        <img
                                            class="rounded-full w-[50px] h-[50px]"
                                            :src="`/storage/${student.photo}`"
                                            alt=""
                                        />
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                                >
                                    <p class="text-gray-900 whitespace-nowrap">
                                        {{ student.name }}
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                                >
                                    <p class="text-gray-900 whitespace-nowrap">
                                        {{ student.parent_name }}
                                    </p>
                                </td>
                                <td
                                    class="px-4 py-3 text-sm bg-white border-b border-gray-200"
                                >
                                    <p
                                        class="text-gray-900 whitespace-nowrap ms-2"
                                    >
                                        {{ student.students.grade }}
                                    </p>
                                </td>
                                <td
                                    class="px-4 py-3 text-sm bg-white border-b border-gray-200"
                                >
                                    <p
                                        class="text-gray-900 whitespace-nowrap ms-2"
                                    >
                                        {{ student.students.grade }}
                                    </p>
                                </td>
                                <td
                                    class="px-4 py-3 text-sm bg-white border-b border-gray-200"
                                >
                                    <p
                                        @click.prevent="
                                            router.push({
                                                name: 'StudentAttendence',
                                                params: { id: student.id },
                                            })
                                        "
                                        class="text-gray-900 whitespace-nowrap cursor-pointer"
                                    >
                                        Attendence
                                    </p>
                                </td>
                                <td
                                    class="px-4 py-3 text-sm bg-white text-center border-b border-gray-200"
                                >
                                    <p
                                        class="text-gray-900 whitespace-nowrap cursor-pointer"
                                    >
                                        <popover>
                                            <span
                                                @click.prevent="
                                                    router.push({
                                                        name: 'StudentFees',
                                                        params: {
                                                            id: student.id,
                                                        },
                                                    })
                                                "
                                                class="mt-[6px] material-symbols-outlined text-indigo-800 cursor-pointer"
                                            >
                                                wallet
                                            </span>
                                        </popover>
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-2 text-sm bg-white border-b border-gray-200"
                                >
                                    <div class="flex items-center gap-2">
                                        <popover>
                                            <span
                                                @click="showModal(student)"
                                                class="mt-[6px] material-symbols-outlined text-indigo-800 cursor-pointer"
                                            >
                                                visibility
                                            </span>
                                        </popover>
                                        <span
                                            @click="
                                                router.push({
                                                    name: 'EditStudent',
                                                    params: { id: student.id },
                                                })
                                            "
                                            class="material-symbols-outlined text-emerald-600 cursor-pointer text-[20px]"
                                        >
                                            edit_square
                                        </span>
                                        <svg
                                            @click="deleteFunc(student.id)"
                                            class="h-4 w-4 fill-red-600 cursor-pointer cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            <path
                                                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0 -12-12h-24a12 12 0 0 0 -12 12v216a12 12 0 0 0 12 12zM432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0 -41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0 -16-16zM171.8 50.9A6 6 0 0 1 177 48h94a6 6 0 0 1 5.2 2.9L293.6 80H154.4zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0 -12-12h-24a12 12 0 0 0 -12 12v216a12 12 0 0 0 12 12z"
                                            />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        class="p-2 border-t-2 border-indigo-500"
                        v-else-if="
                            paginatedData.length == 0 && !paginatedLoader
                        "
                    >
                        No record found!
                    </div>
                    <div v-else class="w-auto">
                        <div class="card">
                            <DataTable :value="products">
                                <Column field="code" header="ID">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                                <Column field="name" header="Photo">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                                <Column field="category" header="Name">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                                <Column field="quantity" header="Father Name">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                                <Column field="quantity" header="Grade">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                                <Column field="quantity" header="Email">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                                <Column field="quantity" header="Action">
                                    <template #body>
                                        <Skeleton class="py-4"></Skeleton>
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                    <Pagination v-if="paginatedData.length > 0" />
                </div>
            </div>
        </div>
    </div>

    <!-- modal -->
    <div class="card flex justify-content-center">
        <Dialog
            v-model:visible="visible"
            modal
            header="Student Profile"
            :style="{ width: '25rem' }"
        >
            <div class="flex justify-center">
                <img
                    class="w-[130px] h-[130px] rounded-full border-[8px] p-1"
                    :src="`/storage/${studentInfo.photo}`"
                    alt=""
                />
            </div>
            <div class="mt-4">
                <div class="w-full flex justify-between border-b-2 py-2">
                    <span>ID</span>
                    <span>{{ studentInfo.id }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 py-2">
                    <span>Name</span>
                    <span>{{ studentInfo.name }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 py-2">
                    <span>Father name</span>
                    <span>{{ studentInfo.parent_name }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>Email</span>
                    <span>{{ studentInfo.email }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>Phone</span>
                    <span>{{ studentInfo.contact_number }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>Date of birth</span>
                    <span>{{ studentInfo.date_of_birth }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>Gender</span>
                    <span>{{ studentInfo.gender }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>status</span>
                    <span>{{ studentInfo.status }}</span>
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>Class</span>
                    <span
                        >{{ studentInfo.class }}/{{
                            studentInfo.students.class
                        }}</span
                    >
                </div>
                <div class="w-full flex justify-between border-b-2 mt-2 py-2">
                    <span>Created at</span>
                    <span>{{ studentInfo.created_at }}</span>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, onBeforeMount } from "vue";
import ProgressBar from "primevue/progressbar";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import { useStudent } from "@/composables/useStudent";
import { useAppStore } from "@/store/useAppStore";
import Dialog from "primevue/dialog";
import Button from "primevue/Button";
import Swal from "sweetalert2";
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const products = ref(new Array(6));
const { deleteStudent } = useStudent();
const router = useRouter();
const appStore = useAppStore();

const paginatedData = computed(() => appStore.paginatedData);
const paginatedLoader = computed(() => appStore.paginatedLoader);

const visible = ref(false);
const studentInfo = ref("");
const showModal = (student) => {
    visible.value = true;
    studentInfo.value = student;
};
const deleteFunc = (id) => {
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
            deleteStudent(id);
        }
    });
};

const page = JSON.parse(localStorage.getItem("pageName"));
onBeforeMount(() => {
    if (page != "students") {
        localStorage.setItem("pageName", JSON.stringify("students"));
        appStore.paginatedData = "";
        appStore.current_page = 1;
    }
});

onMounted(() => {
    appStore.url = "/api/students/index";
    appStore.getData(appStore.url);
});
</script>
<style>
.p-progressbar-value {
    background: rgb(10, 126, 235) !important;
}
.p-progressbar {
    background-color: white !important;
}
</style>
