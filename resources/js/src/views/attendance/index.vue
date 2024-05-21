<template>
    <div class="flex flex-wrap" v-if="students.length > 0">
        <div
            v-for="(student, index) in students"
            :key="index"
            class="mx-4 bg-white p-4 flex flex-col items-center gap-2 justify-center"
        >
            <img
                :src="`/storage/${student.photo}`"
                class="w-[80px] h-[80px] rounded-full"
                alt=""
            />

            <h5>{{ student.name }}</h5>
            <div class="flex">
                <label for="present">
                    <input
                        @change="handleChange"
                        type="radio"
                        hidden
                        name="attendance"
                        id="present"
                    />
                    <span
                        class="w-[25px] h-[25px] p-2 hover:bg-green-500 text-sm cursor-pointer rounded-full mx-1 bg-slate-900 text-white"
                        >P</span
                    >
                </label>
                <label for="obsent">
                    <input type="radio" hidden name="attendance" id="obsent" />
                    <span
                        class="w-[25px] h-[25px] p-2 hover:bg-green-500 text-sm cursor-pointer rounded-full mx-1 bg-slate-900 text-white"
                        >O</span
                    >
                </label>
                <label for="leave">
                    <input type="radio" hidden name="attendance" id="leave" />
                    <span
                        class="w-[25px] h-[25px] p-2 hover:bg-green-500 text-sm cursor-pointer rounded-full mx-1 bg-slate-900 text-white"
                        >L</span
                    >
                </label>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useAttendance } from "@/composables/useAttendance";

const { index, students } = useAttendance();

const studentAttendaceData = ref([
    {
        id: "",
        Present: 0,
        Obsent: 0,
        Leave: 0,
    },
]);

const handleChange = (event) => {
    console.log(event.target.value);
};

onMounted(() => {
    index();
});
</script>
