<template>
    <div
        class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]"
    >
        <main class="w-full min-h-screen py-1">
            <div class="p-2 md:p-4">
                <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                    <h2 class="pl-6 text-2xl font-bold sm:text-xl">
                        User Profile
                    </h2>

                    <div class="grid max-w-2xl mx-auto mt-8">
                        <div
                            class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0"
                        >
                            <img
                                class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
                                alt="Bordered avatar"
                            />

                            <div class="flex flex-col space-y-5 sm:ml-8">
                                <button
                                    :disabled="!isEdit"
                                    type="button"
                                    class="py-2 px-2 text-base font-normal text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                >
                                    Change picture
                                </button>
                            </div>
                        </div>

                        <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                            <div
                                class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6"
                            >
                                <div class="w-full">
                                    <label
                                        for="first_name"
                                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        >Your first name</label
                                    >
                                    <input
                                        :disabled="!isEdit"
                                        type="text"
                                        id="first_name"
                                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="Your first name"
                                        v-model="data.name"
                                        required
                                    />
                                </div>

                                <div class="w-full">
                                    <label
                                        for="last_name"
                                        class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        >Your last name</label
                                    >
                                    <input
                                        :disabled="!isEdit"
                                        type="text"
                                        id="last_name"
                                        class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="Your last name"
                                        v-model="data.name"
                                        required
                                    />
                                </div>
                            </div>

                            <div class="mb-2 sm:mb-6">
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >Your email</label
                                >
                                <input
                                    :disabled="!isEdit"
                                    type="email"
                                    id="email"
                                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="your.email@mail.com"
                                    v-model="data.email"
                                    required
                                />
                            </div>

                            <div class="mb-2 sm:mb-6">
                                <label
                                    for="profession"
                                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >Profession</label
                                >
                                <input
                                    :disabled="!isEdit"
                                    type="text"
                                    id="profession"
                                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="your profession"
                                    v-model="data.profession"
                                    required
                                />
                            </div>

                            <div class="mb-6">
                                <label
                                    for="message"
                                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    >Bio</label
                                >
                                <textarea
                                    :disabled="!isEdit"
                                    id="message"
                                    rows="6"
                                    v-model="data.bio"
                                    class="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Write your bio here..."
                                ></textarea>
                            </div>

                            <div class="flex justify-end mt-10">
                                <button
                                    v-if="!isEdit"
                                    @click="isEdit = !isEdit"
                                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    v-else
                                    type="submit"
                                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useUser } from "@/composables/user/useUser";
const { userInfo, data } = useUser();

const isEdit = ref(false);
onMounted(() => {
    userInfo();
});
</script>
