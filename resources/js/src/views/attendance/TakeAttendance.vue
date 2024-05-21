<template>
    <div class="flex flex-wrap" v-if="students.length > 0">
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
    <div class="flex justify-start m-4">
        <button
            @click="takeAttendance(students)"
            class="rounded py-2 px-6 cursor-pointer bg-slate-800 text-white"
        >
            Save
        </button>
    </div>
</template>
<script setup>
import { useAttendance } from "@/composables/useAttendance";

const { takeAttendance } = useAttendance();
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
