<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2" style="width: 100%; max-width: 400px; border-radius: 12px">
      <q-card-section class="text-center">
        <q-icon name="calculate" size="50px" color="primary" />
        <div class="text-h5 text-weight-bold q-mt-sm">GPA Pro</div>
        <div class="text-caption text-grey">Student GPA Calculator</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            outlined
            v-model="username"
            label="Username"
            :rules="[(val) => !!val || 'กรุณากรอก Username']"
          />
          <q-input
            outlined
            v-model="password"
            type="password"
            label="Password"
            :rules="[(val) => !!val || 'กรุณากรอก Password']"
          />

          <q-btn
            type="submit"
            color="primary"
            class="full-width q-mt-sm"
            label="LOGIN"
            icon-right="login"
          />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center text-grey-7 bg-grey-1 q-mt-md" style="border-radius: 8px">
        <div class="text-weight-bold">Demo Account</div>
        <div>Username: student</div>
        <div>Password: 123456</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useQuasar } from 'quasar'

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const handleLogin = () => {
  if (username.value === 'student' && password.value === '123456') {
    authStore.login(username.value)
    router.push('/')
  } else {
    $q.dialog({
      title: 'Login Failed',
      message: 'Username หรือ Password ไม่ถูกต้อง',
      color: 'negative',
    })
  }
}
</script>
