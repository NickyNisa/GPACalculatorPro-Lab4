<template>
  <q-page padding>
    <div class="text-h4 text-primary q-mb-md text-center">GPA Calculator</div>

    <div v-if="isLoading" class="flex flex-center q-mt-x1">
      <q-spinner-gears
        color="primary"
        size="40px"
        :thickness="5"/>
        <div class="q-ml-sm text-h6 text-primary">กำลังโหลดข้อมูล...</div>
    </div>

    <div v-else class="row q-col-gutter-md"></div>

    <div class="col-12 col-md-6">
      <q-card flat bordered/>
        <q-card-section class="q-gutter-md">
          <q-input v-model = "form.name" label="ชื่อวิชา" filled />
          <q-input v-model.number = "form.credit" type="number" label="หน่วยกิต" filled />
          <q-input v-model.number = "form.score" type="number" label="ตะแนน (0-100)" filled />
          <q-input v-model = "previewGrade" label="เกรดที่ได้ (พรีวิว)" filled readonly />
          <q-btn color="primary" label = "เพิ่มรายวิชา" class="full-width" @click="addSubject" />
        </q-card-section>
    </div>
    <div class="col-12 col-md-6">
      <q-card flat bordered v-if="subjects.length === 0" class="flex flex-center" style="min-height: 200px;">
          <div class="text-grey-h6 text-center">
            <q-icon name="warning" size="3rem" />
            <div>ยังไม่มีวิชาที่เรียน</div>
          </div>  
      </q-card>
      <div v-else>
          <SubjectList :subjects="subjects" @delete-subject="removeSubject" />
          <q-card flat bordered class="q-mt-md bg-grey-1">
            <q-card-section class="row text-center">
              <div class="col-6">
                <div class="text-subtitle2">หน่วยกิตรวม</div>
                <div class="text-h6">{{ totalCredits }}</div>
              </div>
              <div class="col-6">
                <div class="text-subtitle2 text-primary">เกรดเฉลี่ย (GPA)</div>
                <div class="text-h5 text-primary text-weight-bold">{{ semesterGPA.toFixed(2) }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import SubjectList from '@/components/SubjectList.vue';

const isLoading = ref(true);
const subjects = ref([]);
const form = ref({
  name: '',
  credit: 0,
  score: 0
});

const previewGrade = ref('');

const calculateGrade = (score) => {
  if (score >= 80) return { grade: 'A', point: 4.0 };
  if (score >= 75) return { grade: 'B+', point: 3.5 };
  if (score >= 70) return { grade: 'B', point: 3.0 };
  if (score >= 65) return { grade: 'C+', point: 2.5 };
  if (score >= 60) return { grade: 'C', point: 2.0 };
  if (score >= 55) return { grade: 'D+', point: 1.5 };
  if (score >= 50) return { grade: 'D', point: 1.0 };
  return { grade: 'E', point: 0 };
};

watch(
  () => [form.value.score, form.value.credit],
  ([newScore]) => {
    const { grade } = calculateGrade(newScore);
    previewGrade.value = (newScore > 0 || form.value.credit > 0) ? grade : '';
  }
);

const addSubject = () => {
  if (!form.value.name || form.value.credit <= 0) return;
  const { grade, point } = calculateGrade(form.value.score);
  subjects.value.push({
    name: form.value.name,
    credit: Number(form.value.credit),
    score: Number(form.value.score),
    grade,
    point
  });
  form.value = { name: '', credit: 0, score: 0 };
  previewGrade.value = '';
};

const removeSubject = (index) => {
  subjects.value.splice(index, 1);
};

const totalCredits = computed(() => {
  return subjects.value.reduce((sum, subject) => sum + subject.credit, 0);
});

const semesterGPA = computed(() => {
  if (totalCredits.value === 0) return 0;
  const totalPoints = subjects.value.reduce((sum, subject) => sum + (subject.point * subject.credit), 0);
  return totalPoints / totalCredits.value;
});

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 4000);
});
</script>