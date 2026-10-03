import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSubjectStore = defineStore(
  'subject',
  () => {
    const subjects = ref([])

    const addSubject = (newSubject) => {
      subjects.value.push(newSubject)
    }

    const deleteSubject = (index) => {
      subjects.value.splice(index, 1)
    }

    const clearAllSubjects = () => {
      subjects.value = []
    }

    const totalCredits = computed(() => {
      return subjects.value.reduce((sum, sub) => sum + sub.credit, 0)
    })

    const semesterGPA = computed(() => {
      if (totalCredits.value === 0) return 0
      const totalPoints = subjects.value.reduce((sum, sub) => sum + sub.point * sub.credit, 0)
      return totalPoints / totalCredits.value
    })

    return { subjects, addSubject, deleteSubject, clearAllSubjects, totalCredits, semesterGPA }
  },
  {
    persist: true,
  },
)
