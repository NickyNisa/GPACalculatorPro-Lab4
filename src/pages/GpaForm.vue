<template>
  <q-card flat bordered class="q-mb-md">
    <q-form ref="myForm" class="row q-col-gutter-sm item-start">
      <div class="col-12 col-md-4">
        <q-input
          outlined
          v-model="form.name"
          label="ชื่อวิขา"
          :rules="[(val) => !!val || 'กรุณากรอกชื่อวิชา']"
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input>
          <q-input
            outlined
            type="number"
            v-model.number="form.credit"
            label="หน่วยกิต"
            :rules="[
              (val) => (val !== null && val !== '') || 'กรุณากรอกหน่วยกิต',
              (val) => (val > 0 && val <= 10) || 'หน่วยกิตต้องอยู่ระหว่าง 1-10',
            ]"
          />
        </q-input>
      </div>
      <div class="col-12 col-md-3">
        <q-input
          outlined
          type="number"
          v-model.number="form.score"
          label="คะแนน (0-100)"
          :rules="[
            (val) => (val !== null && val !== '') || 'กรุณากรอกคะแนน',
            (val) => (val >= 0 && val <= 100) || 'คะแนนต้องอยู่ระหว่าง 0-100',
          ]"
        />
      </div>
      <div class="col-12 col-md-2">
        <q-input outlined v-model="previewGrade" label="เกรด" readonly class="bg-grey-1" />
      </div>
      <div class="col-12 q-mt-sm">
        <q-btn
          color="primary"
          class="full-width"
          icon="add_circle"
          label="เพิ่มวิชาลงในรายการ"
          @click="submitForm"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script setup>
import { ref, watch, nextTick } from 'vue'

const emit = defineEmits(['add-subject'])
const myForm = ref(null)

const form = ref({
  name: '',
  credit: null,
  score: null,
})
const previewGrade = ref('')
const previewPoint = ref(0)

const calculateGrade = (score) => {
  if (score >= 80) return { grade: 'A', point: 4.0 }
  if (score >= 75) return { grade: 'B+', point: 3.5 }
  if (score >= 70) return { grade: 'B', point: 3.0 }
  if (score >= 65) return { grade: 'C+', point: 2.5 }
  if (score >= 60) return { grade: 'C', point: 2.0 }
  if (score >= 55) return { grade: 'D+', point: 1.5 }
  if (score >= 50) return { grade: 'D', point: 1.0 }
  return { grade: 'E', point: 0 }
}

watch(
  () => form.value.score,
  (newScore) => {
    if (newScore !== null && newScore >= 0 && newScore <= 100) {
      const result = calculateGrade(newScore)
      previewGrade.value = result.grade
      previewPoint.value = result.point
    } else {
      previewGrade.value = ''
      previewPoint.value = 0
    }
  },
)

const submitForm = () => {
  if (myForm.value) {
    myForm.value.validate().then(async (success) => {
      if (success) {
        emit('add-subject', {
          name: form.value.name,
          credit: Number(form.value.credit),
          score: Number(form.value.score),
          grade: previewGrade.value,
          point: previewPoint.value,
        })

        form.value = { name: '', credit: null, score: null }
        previewGrade.value = ''
        await nextTick()
        myForm.value.resetValidation()
      }
    })
  }
}
</script>
