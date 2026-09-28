<template>
  <q-card flat bordered class="q-mb-md">
    <q-card-section v-if="isLoading" class="text-center q-pa-xl">
      <q-spinner-dots color="primary" size="3em" />
      <div class="q-mt-sm text-grey-7">กำลังโหลดข้อมูล...</div>
    </q-card-section>

    <div v-else>
      <q-card-section class="row items-center justify-between bg-grey-1">
        <div class="text-subtitle1 text-weight-bold">รายชื่อวิชา ({{ subjects.length }})</div>
        <q-btn
          v-if="subjects.length > 0"
          flat
          dense
          color="negative"
          icon="delete_sweep"
          @click="$emit('clear-all')"
        />
      </q-card-section>

      <q-card-section v-if="subjects.length === 0" class="text-center text-grey q-pa-lg">
        <q-icon name="list_alt" size="4em" />
        <div class="q-mt-sm">ยังไม่มีข้อมูลวิชาที่เพิ่มเข้ามา</div>
      </q-card-section>
      <q-list v-else separator>
        <q-item v-for="(subject, index) in subjects" :key="index">
          <q-item-section avatar>
            <q-avatar :color="getGradeColor(subject.grade)" text-color="white" font-size="20px">
              {{ subject.grade }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1 text-weight-medium">{{
              subject.name
            }}</q-item-label>
            <q-item-label caption>
              หน่วยกิต: {{ subject.credit }} | คะแนน: {{ subject.score }}
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            class="row items-center justify-end"
            style="flex-direction: row; gap: 8px"
          >
            <q-item-label caption>GP: {{ subject.point.toFixed(1) }}</q-item-label>
            <q-btn
              flat
              round
              dense
              icon="delete_outline"
              color="negative"
              @click="$emit('delete-subject', index)"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  subjects: {
    type: Array,
    required: true,
  },
})
defineEmits(['delete-subject', 'clear-all'])

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})

const getGradeColor = (grade) => {
  const colors = {
    A: 'positive',
    'B+': 'green-7',
    B: 'green-6',
    'C+': 'orange-8',
    C: 'orange-7',
    'D+': 'deep-orange-6',
    D: 'deep-orange-8',
    E: 'negative',
  }
  return colors[grade] || 'grey'
}
</script>
