<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-10/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
            >
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">
                            Add New Teacher
                        </h6>
                    </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form @submit.prevent="addTeacher(student_data, file)">
                        <div
                            class="flex my-8 flex-col items-center space-y-5 sm:flex-row sm:space-y-0"
                        >
                            <img
                                class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                :src="
                                    imageUrl
                                        ? imageUrl
                                        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=='
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
                                        v-model="student_data.name"
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
                                        v-model="student_data.father_name"
                                    />
                                    <p
                                        v-if="errors?.parent_name"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.parent_name[0] }}
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
                                        v-model="student_data.email"
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
                                            v-model="student_data.degree"
                                            :options="degree"
                                            optionLabel="name"
                                            placeholder="Select a Degree"
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
                                            v-model="student_data.gender"
                                            :options="options"
                                            optionLabel="name"
                                            placeholder="Select a Gender"
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
                                        v-model="student_data.dob"
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
                                        v-model="student_data.address"
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
                                        v-model="student_data.contact"
                                    />
                                    <p
                                        v-if="errors?.contact"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.contact[0] }}
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
                                Adding Teacher
                            </button>
                            <button
                                v-else
                                class="bg-indigo-700 hover:bg-indigo-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Add Teacher
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useAppStore } from "@/store/useAppStore";
import Dropdown from "primevue/dropdown";

const appStore = useAppStore();
const loading = computed(() => appStore.loading);

const options = ref([{ name: "Male" }, { name: "Female" }]);
const degree = ref([
    { name: "Bikloria" },
    { name: "Bachlor" },
    { name: "Master" },
]);
</script>
