<template>
  <div>
    <v-breadcrumbs :items="categories">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-tag" color="teal"></v-icon>
      </template>
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { Category } from 'types'

const props = defineProps<{
  items: Category[]
}>()

const list = reactive(props.items)

const categories = computed(() => {
  const items = list.map((item) => ({
    title: item.name,
    disabled: false,
    href: `/categories/${item.id}`
  }))

  return items
})
</script>