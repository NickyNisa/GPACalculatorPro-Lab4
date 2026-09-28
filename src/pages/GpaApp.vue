<template>
  <q-page class="q-pa-md" style="max-width: 900px; margin: 0 auto">
    <div class="text-center q-mb-lg q-mt-md">
      <q-icon name="calculate" size="50px" color="primary" />
      <div class="text-h4 text-weight-bold q-mt-sm">GPA Calculator Pro</div>
      <div class="text-subtitle1 text-grey-6">ระบบคำนวณและบันทึกเกรดเฉลี่ยรายภาคเรียน</div>
    </div>
    <GpaForm @add-subject="addSubject" />
  </q-page>
</template>
<script setup>
import GpaForm from './GpaForm.vue'
</script>
