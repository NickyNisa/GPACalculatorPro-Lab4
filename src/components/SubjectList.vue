<template>
  <q-markup-table flat bordered>
    <thead>
      <tr>
        <th class="text-left">ชื่อวิชา</th>
        <th class="text-right">หน่วยกิต</th>
        <th class="text-right">คะแนน</th>
        <th class="text-right">เกรด</th>
        <th class="text-center">จัดการ</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(subject, index) in subjects" :key="index">
        <td class="text-left">{{ subject.name }}</td>
        <td class="text-right">{{ subject.credit }}</td>
        <td class="text-right">{{ subject.score }}</td>
        <td class="text-right" :class="{ 'bg-red text-white': subject.grade === 'E' }">
          {{ subject.grade }}
        </td>
        <td class="text-center">
          <q-btn flat dense icon="delete" color="negative" @click="$emit('delete-subject', index)" />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>

defineProps({
  subjects: {
    type: Array,
    required: true
  }
});

defineEmits(['delete-subject']);
</script>