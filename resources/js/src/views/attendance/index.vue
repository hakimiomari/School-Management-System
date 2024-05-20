<template>
    <div class="flex flex-wrap" v-if="students.length > 0">
        <div
            v-for="student in students"
            class="mx-4 bg-white p-4 flex flex-col items-center gap-2 justify-center"
        >
            <img
                :src="`/storage/${student.photo}`"
                class="w-[80px] h-[80px] rounded-full"
                alt=""
            />

            <h5>{{ student.name }}</h5>
            <div>
                <label for="present">
                    <input type="radio" name="attendance" id="present" />
                    <span>Present</span>
                </label>
                <label for="obsent">
                    <input type="radio" name="attendance" id="obsent" />
                    <span>Obsent</span>
                </label>
                <label for="leave">
                    <input type="radio" name="attendance" id="leave" />
                    <span>Leave</span>
                </label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useAttendance } from "@/composables/useAttendance";

const { index, students } = useAttendance();

onMounted(() => {
    index();
});
</script>
