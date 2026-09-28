<template>
  <div class="row q-col-gutter-sm">
    <div class="col-6">
      <q-card class="bg-blue-8 text-white text-center q-pa-sm" flat>
        <q-card-section>
          <div class="text-subtitle2 text-blue-2">หน่วยกิตรวม</div>
          <div class="text-h3 text-weight-bold">{{ totalCredits }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6">
      <q-card class="bg-light-blue-6 text-white text-center q-pa-sm" flat>
        <q-card-section>
          <div class="text-subtitle2 text-blue-1">เกรดเฉลี่ย (GPA)</div>
          <div class="text-h3 text-weight-bold">{{ semesterGPA.toFixed(2) }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  subjects: {
    type: Array,
    required: true,
  },
})

const totalCredits = computed(() => {
  return props.subjects.reduce((sum, sub) => sum + sub.credit, 0)
})

const semesterGPA = computed(() => {
  if (totalCredits.value === 0) return 0
  const totalPoints = props.subjects.reduce((sum, sub) => sum + sub.point * sub.credit, 0)
  return totalPoints / totalCredits.value
})
</script>
