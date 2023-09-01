<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { CreateTokenCartResponse } from './types'

const cartToken = useCookie('ct')

cartToken.value = cartToken.value || undefined

if (cartToken.value === undefined) {
  const { data } = await useAPI<CreateTokenCartResponse>('carts/', { method: 'POST' })

  await $fetch("/api/set-cart-cookie", { method: 'POST', body: {
    key: data.value?.token
  }})
}
</script>
