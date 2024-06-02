<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-10/12 px-4 mx-auto mt-6">
            <div

                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
            >
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">
                            Edit Teacher
                        </h6>
                    </div>
                </div>
                <div v-if="teacherInfo" class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form @submit.prevent="updateTeacher(teacherInfo, file)">
                        <div
                            class="flex my-8 flex-col items-center space-y-5 sm:flex-row sm:space-y-0"
                        >
                            <img
                                class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                :src="
                                    imageUrl
                                        ? imageUrl
                                        : `/storage/${teacherInfo.teacher.image}`
                                "
                                alt="Bordered avatar"
                            />
                            <p
                                v-if="errors?.file"
                                class="text-xs mt-1 text-red-500"
                            >
                                {{ errors?.file[0] }}
                            </p>
                            <div class="flex flex-col space-y-5 sm:ml-8">
                                <input
                                    hidden
                                    type="file"
                                    @change="handleFileChange"
                                    id="file"
                                    accept="image/*"
                                />
                                <label
                                    for="file"
                                    type="button"
                                    class="py-2 cursor-pointer px-2 text-base font-normal text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                >
                                    <span v-if="!imageUrl"> Select Image </span>
                                    <span v-else>Change Image</span>
                                </label>
                            </div>
                        </div>
                        <p
                            v-if="errors?.photo"
                            class="text-xs mt-1 text-red-500"
                        >
                            {{ errors?.photo[0] }}
                        </p>
                        <h6
                            class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
                        >
                            Teacher Information
                        </h6>
                        <div class="flex flex-wrap">
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ahmad.Kamran"
                                        v-model="teacherInfo.teacher.name"
                                    />
                                    <p
                                        v-if="errors?.name"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.name[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Father Name
                                    </label>
                                    <input
                                        type="text"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Omar"
                                        v-model="teacherInfo.father_name"
                                    />
                                    <p
                                        v-if="errors?.father_name"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.father_name[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="hakimi@gmail.com"
                                        v-model="teacherInfo.teacher.email"
                                    />
                                    <p
                                        v-if="errors?.email"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.email[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Degree
                                    </label>
                                    <div
                                        class="card flex justify-content-center"
                                    >
                                        <Dropdown
                                            v-model="teacherInfo.degree"
                                            :options="degree"
                                            class="w-full md:w-14rem"
                                        />
                                    </div>
                                    <p
                                        v-if="errors?.degree"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.degree[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Gender
                                    </label>
                                    <div
                                        class="card flex justify-content-center"
                                    >
                                        <Dropdown
                                            v-model="teacherInfo.gender"
                                            :options="options"
                                            class="w-full md:w-14rem"
                                        />
                                    </div>
                                    <p
                                        v-if="errors?.gender"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.gender[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        v-model="teacherInfo.date_of_birth"
                                    />
                                    <p
                                        v-if="errors?.date_of_birth"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.date_of_birth[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        address
                                    </label>
                                    <input
                                        type="text"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Kabul, Zone 5, Street No 6"
                                        v-model="teacherInfo.address"
                                    />
                                    <p
                                        v-if="errors?.address"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.address[0] }}
                                    </p>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Contact
                                    </label>
                                    <input
                                        type="number"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="0781288992"
                                        v-model="teacherInfo.contact"
                                    />
                                    <p
                                        v-if="errors?.contact"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.contact[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="w-full  px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Bio
                                    </label>
                                    <textarea
                                    rows="3"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="0781288992"
                                        v-model="teacherInfo.teacher.bio"
                                    />
                                    <p
                                        v-if="errors?.bio"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.bio[0] }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end mt-5 pe-3">
                            <button
                                v-if="loading"
                                class="bg-indigo-700 hover:bg-indigo-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
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
                                Updating Teacher
                            </button>
                            <button
                                v-else
                                class="bg-indigo-700 hover:bg-indigo-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Update Teacher
                            </button>
                        </div>
                    </form>
                </div>
                <div v-else class="card bg-slate-300 pt-2">
                    <div
                        class="border-round border-1 surface-border p-4 surface-card"
                    >
                        <div class="flex mb-3">
                            <Skeleton
                                shape="circle"
                                size="4rem"
                                class="mr-2"
                            ></Skeleton>
                            <div>
                                <Skeleton width="10rem" class="mb-2"></Skeleton>
                                <Skeleton width="5rem" class="mb-2"></Skeleton>
                                <Skeleton height=".5rem"></Skeleton>
                            </div>
                        </div>
                        <Skeleton width="100%" height="70px" class="mb-2"</Skeleton>
                        <Skeleton width="100%" height="70px" class="mb-2"</Skeleton>
                        <Skeleton width="100%" height="70px" class="mb-2"</Skeleton>
                        <Skeleton width="100%" height="70px" class="mb-2"</Skeleton>
                        <Skeleton width="100%" height="70px" class="mb-2"</Skeleton>
                        <div class="flex justify-end gap-2 mt-3">
                            <Skeleton width="10rem" height="3rem"></Skeleton>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useAppStore } from "@/store/useAppStore";
import Dropdown from "primevue/dropdown";
import { useUser } from "@/composables/user/useUser";
import { useTeacher } from "@/composables/useTeacher";
import { useRoute } from "vue-router";
import Skeleton from "primevue/skeleton";

const route = useRoute();
const appStore = useAppStore();
const loading = computed(() => appStore.loading);
const { getTeacher, teacherInfo, errors,updateTeacher } = useTeacher();
const { handleFileChange, imageUrl, file } = useUser();

const options = ref(["Male", "Female"]);
const degree = ref(["Bikloria", "Bachlor", "Master"]);

onMounted(() => {
    getTeacher(route.params.id);
});
</script>
