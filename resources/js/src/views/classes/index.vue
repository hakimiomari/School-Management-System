<template>
    <div>
        <div class="mt-3">
            <h2 class="text-xl font-semibold leading-tight text-gray-700">
                Classes
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
                                @click="appStore.open = true"
                                type="button"
                                class="text-white sm:hidden bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                            >
                                Add New Class
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
                    @click="appStore.open = true"
                    type="button"
                    class="text-white mb-1 hidden sm:block bg-indigo-700 hover:bg-indigo-800 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                    Add New Class
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
                                    Grade
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Class
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Created at
                                </th>
                                <th
                                    class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200"
                                >
                                    Status
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
                                v-for="(u, index) in paginatedData"
                                :key="index"
                            >
                                <td
                                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                >
                                    {{ u.id }}
                                </td>
                                <td
                                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                >
                                    <p class="text-gray-900 whitespace-nowrap">
                                        {{ u.grade }}
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                >
                                    <p class="text-gray-900 whitespace-nowrap">
                                        {{ u.class }}
                                    </p>
                                </td>
                                <td
                                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                >
                                    <p class="text-gray-900 whitespace-nowrap">
                                        {{ u.created_at }}
                                    </p>
                                </td>
                                <td
                                    class="px-4 py-5 text-xs font-bold bg-white border-b border-gray-200"
                                >
                                    <span
                                        :class="
                                            u.status == 'Active'
                                                ? 'bg-green-500 text-white dark:bg-green-500 dark:text-white'
                                                : 'bg-gray-500 text-white dark:bg-gray-500 dark:text-white'
                                        "
                                        @click="showStatusModel(u)"
                                        class="relative cursor-pointer text-xs font-normal me-2 px-2.5 py-0.5 rounded-lg"
                                        >{{ u.status }}</span
                                    >
                                </td>
                                <td
                                    class="px-5 py-5 text-sm bg-white border-b border-gray-200"
                                >
                                    <svg
                                        @click="showDeleteAlert(u.id)"
                                        class="h-4 w-4 fill-red-600 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0 -12-12h-24a12 12 0 0 0 -12 12v216a12 12 0 0 0 12 12zM432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0 -41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0 -16-16zM171.8 50.9A6 6 0 0 1 177 48h94a6 6 0 0 1 5.2 2.9L293.6 80H154.4zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0 -12-12h-24a12 12 0 0 0 -12 12v216a12 12 0 0 0 12 12z"
                                        />
                                    </svg>
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
                        <div class="h-4 bg-gray-400 mt-3 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-400 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-400 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-400 mt-3 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-300 mb-6 rounded"></div>
                        <div class="h-4 bg-gray-400 mb-6 rounded"></div>
                    </div>
                    <Pagination v-if="paginatedData.length > 0" />
                </div>
            </div>

            <!-- change status -->
            <template>
                <TransitionRoot as="template" :show="appStore.showStatus">
                    <Dialog
                        as="div"
                        class="relative z-10"
                        @close="appStore.showStatus = false"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in duration-200"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div
                                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            />
                        </TransitionChild>

                        <div
                            class="fixed inset-0 z-10 w-screen overflow-y-auto"
                        >
                            <div
                                class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
                            >
                                <TransitionChild
                                    as="template"
                                    enter="ease-out duration-300"
                                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <DialogPanel
                                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                    >
                                        <div
                                            class="bg-white w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                                        >
                                            <div
                                                class="sm:flex w-full sm:items-start"
                                            >
                                                <div
                                                    class="mt-3 w-full sm:ml-4 sm:mt-0 text-left"
                                                >
                                                    <div
                                                        class="flex justify-between"
                                                    >
                                                        <DialogTitle
                                                            as="h3"
                                                            class="text-base font-semibold leading-6 text-gray-900"
                                                            >Change Class
                                                            Status</DialogTitle
                                                        >
                                                        <svg
                                                            @click="
                                                                appStore.showStatus = false
                                                            "
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 352 512"
                                                            class="w-5 h-5 fill-gray-600 cursor-pointer hover:fill-red-500"
                                                        >
                                                            <path
                                                                d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div class="mt-2 w-full">
                                                        <form
                                                            class="space-y-4"
                                                            action="#"
                                                            @submit.prevent="
                                                                changeClassStatus
                                                            "
                                                        >
                                                            <div class="w-full">
                                                                <label
                                                                    for="class"
                                                                    class="block mb-2 text-sm font-medium text-gray-900"
                                                                    >Status</label
                                                                >
                                                                <div
                                                                    class="card flex justify-content-center"
                                                                >
                                                                    <Dropdown
                                                                        v-model="
                                                                            status
                                                                        "
                                                                        :options="
                                                                            statuses
                                                                        "
                                                                        optionLabel="status"
                                                                        class="w-full md:w-14rem"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                                                            >
                                                                <button
                                                                    v-if="
                                                                        loading
                                                                    "
                                                                    type="button"
                                                                    :disabled="
                                                                        loading
                                                                    "
                                                                    class="inline-flex cursor-not-allowed items-center w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
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
                                                                    Changing
                                                                </button>
                                                                <button
                                                                    v-else
                                                                    type="submit"
                                                                    class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
                                                                >
                                                                    Change
                                                                    Status
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                                                    @click="
                                                                        appStore.showStatus = false
                                                                    "
                                                                    ref="cancelButtonRef"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </template>
            <!-- add new class -->
            <template>
                <TransitionRoot as="template" :show="open">
                    <Dialog
                        as="div"
                        class="relative z-10"
                        @close="appStore.open = false"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in duration-200"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div
                                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            />
                        </TransitionChild>

                        <div
                            class="fixed inset-0 z-10 w-screen overflow-y-auto"
                        >
                            <div
                                class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
                            >
                                <TransitionChild
                                    as="template"
                                    enter="ease-out duration-300"
                                    enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enter-to="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leave-from="opacity-100 translate-y-0 sm:scale-100"
                                    leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <DialogPanel
                                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                    >
                                        <div
                                            class="bg-white w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                                        >
                                            <div
                                                class="sm:flex w-full sm:items-start"
                                            >
                                                <div
                                                    class="mt-3 w-full sm:ml-4 sm:mt-0 text-left"
                                                >
                                                    <div
                                                        class="flex justify-between"
                                                    >
                                                        <DialogTitle
                                                            as="h3"
                                                            class="text-base font-semibold leading-6 text-gray-900"
                                                            >Add New
                                                            Class</DialogTitle
                                                        >
                                                        <svg
                                                            @click="
                                                                appStore.open = false
                                                            "
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 352 512"
                                                            class="w-5 h-5 fill-gray-600 cursor-pointer hover:fill-red-500"
                                                        >
                                                            <path
                                                                d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div class="mt-2 w-full">
                                                        <form
                                                            class="space-y-4"
                                                            action="#"
                                                            @submit.prevent="
                                                                addClass(
                                                                    classData
                                                                )
                                                            "
                                                        >
                                                            <div class="w-full">
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
                                                                        v-model="
                                                                            classData.grade
                                                                        "
                                                                        :options="
                                                                            grades
                                                                        "
                                                                        optionLabel="name"
                                                                        placeholder="Select Grade"
                                                                        class="w-full md:w-14rem"
                                                                    />
                                                                </div>
                                                                <p
                                                                    v-if="
                                                                        errors?.grade
                                                                    "
                                                                    class="text-xs mt-2 text-red-500"
                                                                >
                                                                    {{
                                                                        errors
                                                                            ?.grade[0]
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div class="w-full">
                                                                <label
                                                                    for="class"
                                                                    class="block mb-2 text-sm font-medium text-gray-900"
                                                                    >Class</label
                                                                >
                                                                <input
                                                                    type="text"
                                                                    name="class"
                                                                    id="class"
                                                                    class="bg-slate-100 border border-gray-900 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5 dark:bg-slate-50 dark:border-gray-100 dark:placeholder-gray-400"
                                                                    placeholder="Primary"
                                                                    required
                                                                    v-model="
                                                                        classData.class
                                                                    "
                                                                />
                                                                <p
                                                                    v-if="
                                                                        errors?.class
                                                                    "
                                                                    class="text-xs mt-1 text-red-500"
                                                                >
                                                                    {{
                                                                        errors
                                                                            ?.class[0]
                                                                    }}
                                                                </p>
                                                            </div>
                                                            <div
                                                                class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                                                            >
                                                                <button
                                                                    v-if="
                                                                        loading
                                                                    "
                                                                    type="button"
                                                                    :disabled="
                                                                        loading
                                                                    "
                                                                    class="inline-flex cursor-not-allowed items-center w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
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
                                                                    Adding
                                                                </button>
                                                                <button
                                                                    v-else
                                                                    type="submit"
                                                                    class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
                                                                >
                                                                    Add Class
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                                                    @click="
                                                                        appStore.open = false
                                                                    "
                                                                    ref="cancelButtonRef"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import ProgressBar from "primevue/progressbar";
import Dropdown from "primevue/dropdown";
import Swal from "sweetalert2";

import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import { useClass } from "@/composables/useClass";
import Pagination from "@/components/Pagination.vue";

import { useAppStore } from "@/store/useAppStore";

const { addClass, errors, updateStatus, deleteClass } = useClass();
const appStore = useAppStore();

const paginatedData = computed(() => appStore.paginatedData);
const open = computed(() => appStore.open);
const loading = computed(() => appStore.loading);
const paginatedLoader = computed(() => appStore.paginatedLoader);

const classData = ref({
    grade: null,
    class: "",
});
const grades = ref([
    { name: 1 },
    { name: 3 },
    { name: 2 },
    { name: 4 },
    { name: 5 },
    { name: 6 },
    { name: 7 },
    { name: 8 },
    { name: 9 },
    { name: 10 },
    { name: 11 },
    { name: 12 },
]);

const status = ref({ status: null });
const selectedClass = ref("");
const statuses = ref("");
const showStatusModel = (u) => {
    statuses.value = [{ status: "Active" }, { status: "Disactive" }];
    selectedClass.value = u;
    status.value.status = u.status;
    appStore.showStatus = true;
};

const changeClassStatus = () => {
    selectedClass.value.status = status.value.status;
    updateStatus(selectedClass.value);
};

const showDeleteAlert = (id) => {
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
            deleteClass(id);
        }
    });
};

onMounted(() => {
    appStore.url = "/api/class/index";
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
