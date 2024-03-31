<template>
    <section class="py-1 bg-blueGray-50">
        <div class="w-full lg:w-10/12 px-4 mx-auto mt-6">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
            >
                <div class="rounded-t bg-white mb-0 px-6 py-6">
                    <div class="text-center flex justify-between">
                        <h6 class="text-blueGray-700 text-xl font-bold">
                            Add New Student
                        </h6>
                    </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <div
                            class="flex my-8 flex-col items-center space-y-5 sm:flex-row sm:space-y-0"
                        >
                            <img
                                class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                :src="
                                    imageUrl
                                        ? imageUrl
                                        : 'https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw'
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
                        <h6
                            class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase"
                        >
                            User Information
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
                                    />
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
                                    />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="hakimi@example.com"
                                    />
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
                                            v-model="selectedGender"
                                            :options="options"
                                            optionLabel="name"
                                            placeholder="Select a Gender"
                                            class="w-full md:w-14rem"
                                        />
                                    </div>
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
                                        placeholder="Omar"
                                    />
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
                                    />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Grade Level
                                    </label>
                                    <div
                                        class="card flex justify-content-center"
                                    >
                                        <Dropdown
                                            v-model="selectedGrade"
                                            :options="grades"
                                            optionLabel="name"
                                            placeholder="Select Grade"
                                            class="w-full md:w-14rem"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Contact number
                                    </label>
                                    <input
                                        type="number"
                                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="0781288992"
                                    />
                                </div>
                            </div>
                            <div class="w-full lg:w-6/12 px-4">
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Grade to be in
                                    </label>
                                    <div
                                        class="card flex justify-content-center"
                                    >
                                        <Dropdown
                                            v-model="selectedGrade"
                                            :options="grades"
                                            optionLabel="name"
                                            placeholder="Select Grade"
                                            class="w-full md:w-14rem"
                                            @change="
                                                selectClass(selectedGrade.name)
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="gradeClasses.length > 0"
                                class="w-full lg:w-6/12 px-4"
                            >
                                <div class="relative w-full mb-3">
                                    <label
                                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlfor="grid-password"
                                    >
                                        Class
                                    </label>
                                    <div
                                        class="card flex justify-content-center"
                                    >
                                        <Dropdown
                                            v-model="selectedClass"
                                            :options="gradeClasses"
                                            optionLabel="class"
                                            placeholder="Select Grade"
                                            class="w-full md:w-14rem"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end mt-5 pe-3">
                            <button
                                class="bg-indigo-500 hover:bg-indigo-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Add Student
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from "vue";
import { useUser } from "@/composables/user/useUser";
import { useClass } from "@/composables/useClass";
import Dropdown from "primevue/dropdown";

const { selectClass, gradeClasses } = useClass();
const { handleFileChange, imageUrl, file } = useUser();

const selectedGender = ref();
const selectedGrade = ref();
const options = ref([{ name: "Male" }, { name: "Female" }]);
const grades = ref([
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "10" },
    { name: "11" },
    { name: "12" },
]);
</script>
