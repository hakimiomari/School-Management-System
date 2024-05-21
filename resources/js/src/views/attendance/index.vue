<template>
    <TakeAttendance :students="students" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAttendance } from "@/composables/useAttendance";
import TakeAttendance from "@/views/attendance/TakeAttendance.vue";

const { index, students } = useAttendance();

onMounted(() => {
    index();
});
</script>
