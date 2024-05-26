<template>
    <div v-if="students.length > 0">
        <div class="flex flex-wrap items-center justify-center">
            <div
                v-for="(student, index) in students"
                :key="index"
                class="m-4 bg-white p-4 min-w-[200px] flex flex-col items-center gap-2 justify-center rounded shadow"
            >
                <img
                    :src="`/storage/${student.photo}`"
                    class="w-[80px] h-[80px] rounded-full"
                    alt=""
                />

                <div class="mb-2">
                    <h6 class="text-sm">{{ student.name }}</h6>
                </div>
                <div class="flex">
                    <span
                        :class="
                            student.attendance == 'Present'
                                ? 'bg-green-600'
                                : 'bg-slate-900'
                        "
                        class="mx-2 text-white py-1 px-2 flex justify-center items-center cursor-pointer rounded-full text-sm"
                        @click.prevent="handleStatus(student, 'Present')"
                        >P</span
                    >
                    <span
                        :class="
                            student.attendance == 'Obsent'
                                ? 'bg-green-600'
                                : 'bg-slate-900'
                        "
                        class="mx-2 text-white py-1 px-2 flex justify-center items-center cursor-pointer rounded-full text-sm"
                        @click.prevent="handleStatus(student, 'Obsent')"
                        >O</span
                    >
                    <span
                        :class="
                            student.attendance == 'Leave'
                                ? 'bg-green-600'
                                : 'bg-slate-900'
                        "
                        class="mx-2 text-white py-1 px-2 flex justify-center items-center cursor-pointer rounded-full text-sm"
                        @click.prevent="handleStatus(student, 'Leave')"
                        >L</span
                    >
                </div>
            </div>
        </div>
        <div class="flex justify-center m-4">
            <button
                @click="takeAttendance(students)"
                class="rounded py-2 px-6 cursor-pointer bg-slate-800 text-white"
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
                    Saving
                </span>
                <span v-else> Save </span>
            </button>
        </div>
    </div>
    <div v-else  class="flex justify-center items-center flex-wrap gap-6">
        <div class="card" v-for="index in 20">
            <div class="profile_thumb"></div>
            <h1 class="post_title"></h1>
            <div class="flex mt-3 buttons">
                <div class="w-[20px] h-[20px]  mx-2"></div>
                <div class="w-[20px] h-[20px]  mx-2"></div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAttendance } from "@/composables/useAttendance";

const { takeAttendance, loading } = useAttendance();
defineProps({
    students: {
        type: Array,
    },
});

const handleStatus = (student, status) => {
    if (status == "Present") {
        student.attendance = "Present";
    }
    if (status == "Obsent") {
        student.attendance = "Obsent";
    }
    if (status == "Leave") {
        student.attendance = "Leave";
    }
};
</script>
<style scoped>
.card {
    height: 180px;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    background-color: #fff;
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 15px 25px rgba(255, 255, 255, 0.2);
    padding: 10px;
}

.profile_thumb {
    position: relative;
    background: #e5e5e5;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.post_title {
    background: #e5e5e5;
    width: 150px;
    height: 15px;
    border-radius: 8px;
    margin-top: 15px;
}

.card * {
    background: linear-gradient(
        120deg,
        #e5e5e5 30%,
        #f0f0f0 38%,
        #f0f0f0 40%,
        #e5e5e5 48%
    );
    background-size: 200% 100%;
    background-position: 100% 0;
    animation: run 2s infinite;
}

@keyframes run {
    100% {
        background-position: -100% 0;
    }
}
</style>
