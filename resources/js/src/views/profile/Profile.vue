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

                    <form
                        @submit.prevent="updateProfile(data, file)"
                        class="grid max-w-2xl mx-auto mt-8"
                    >
                        <div
                            class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0"
                        >
                            <img
                                v-if="data"
                                class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                :src="
                                    imageUrl
                                        ? imageUrl
                                        : data.image
                                        ? `/storage/${data.image}`
                                        : 'https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw'
                                "
                                alt="Bordered avatar"
                            />

                            <svg
                                v-else
                                aria-hidden="true"
                                role="status"
                                class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 inline w-4 h-4 me-3 text-white animate-spin"
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
                                />
                                <label
                                    for="file"
                                    v-if="!isEdit"
                                    type="button"
                                    class="py-2 cursor-pointer px-2 text-base font-normal text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                >
                                    Change picture
                                </label>
                            </div>
                        </div>

                        <div class="items-center mt-8 sm:mt-14 text-[#202142]">
                            <div
                                class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6"
                            >
                                <div class="w-full">
                                    <label
                                        for="first_name"
                                        class="block mb-2 text-sm font-medium text-indigo-900"
                                        >Your name</label
                                    >
                                    <input
                                        :disabled="isEdit"
                                        type="text"
                                        id="first_name"
                                        :class="
                                            isEdit
                                                ? 'bg-gray-200'
                                                : 'bg-indigo-50'
                                        "
                                        class="border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        placeholder="Your first name"
                                        v-model="data.name"
                                        required
                                    />
                                    <p
                                        v-if="errors?.name"
                                        class="text-xs mt-1 text-red-500"
                                    >
                                        {{ errors?.name[0] }}
                                    </p>
                                </div>
                            </div>

                            <div class="mb-2 sm:mb-6">
                                <label
                                    for="email"
                                    class="block mb-2 text-sm font-medium text-indigo-900"
                                    >Your email</label
                                >
                                <input
                                    :disabled="isEdit"
                                    :class="
                                        isEdit ? 'bg-gray-200' : 'bg-indigo-50'
                                    "
                                    type="email"
                                    id="email"
                                    class="border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="your.email@mail.com"
                                    v-model="data.email"
                                    required
                                />
                                <p
                                    v-if="errors?.email"
                                    class="text-xs mt-1 text-red-500"
                                >
                                    {{ errors?.email[0] }}
                                </p>
                            </div>

                            <div class="mb-2 sm:mb-6">
                                <label
                                    for="profession"
                                    class="block mb-2 text-sm font-medium text-indigo-900"
                                    >Profession</label
                                >
                                <input
                                    :disabled="isEdit"
                                    :class="
                                        isEdit ? 'bg-gray-200' : 'bg-indigo-50'
                                    "
                                    type="text"
                                    id="profession"
                                    class="border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    placeholder="your profession"
                                    v-model="data.profession"
                                    required
                                />
                                <p
                                    v-if="errors?.profession"
                                    class="text-xs mt-1 text-red-500"
                                >
                                    {{ errors?.profession[0] }}
                                </p>
                            </div>

                            <div class="mb-6">
                                <label
                                    for="message"
                                    class="block mb-2 text-sm font-medium text-indigo-900"
                                    >Bio</label
                                >
                                <textarea
                                    :disabled="isEdit"
                                    :class="
                                        isEdit ? 'bg-gray-200' : 'bg-indigo-50'
                                    "
                                    id="message"
                                    rows="6"
                                    v-model="data.bio"
                                    class="block p-2.5 w-full text-sm text-indigo-900 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Write your bio here..."
                                ></textarea>
                                <p
                                    v-if="errors?.bio"
                                    class="text-xs mt-1 text-red-500"
                                >
                                    {{ errors?.bio[0] }}
                                </p>
                            </div>

                            <div class="flex justify-end mt-10">
                                <button
                                    v-if="isEdit"
                                    @click="user.isEdit = !user.isEdit"
                                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    v-else
                                    type="submit"
                                    class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                >
                                    <span v-if="loading" :disabled="loading">
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
                                        Saving</span
                                    >
                                    <span v-else>Save Changes</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>
<script setup>
import { onMounted, computed } from "vue";
import { useUser } from "@/composables/user/useUser";
import { userStore } from "@/store/userStore";
const {
    userInfo,
    data,
    handleFileChange,
    imageUrl,
    file,
    updateProfile,
    errors,
} = useUser();

const user = userStore();
const isEdit = computed(() => user.isEdit);
const loading = computed(() => user.loading);
onMounted(() => {
    userInfo();
});
</script>
