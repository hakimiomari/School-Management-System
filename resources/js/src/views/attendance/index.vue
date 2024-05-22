<template>
    <TakeAttendance :students="students" />
</template>
<script setup>
import { onMounted } from "vue";
import { useAttendance } from "@/composables/useAttendance";
import TakeAttendance from "@/views/attendance/TakeAttendance.vue";

const { index, students, classDailyReport } = useAttendance();

onMounted(() => {
    index();
    classDailyReport();
});
</script>
