<template>
  <v-card
    :class="[
      'pa-5',
      'shipping-method-card',
      selected ? 'shipping-method-card-active' : 'shipping-method-card-inactive'
    ]"
    variant="tonal" :color="selected ? 'teal' : ''">
    {{ name }} {{ desc }}
  </v-card>
</template>
<script setup lang="ts">
const props = defineProps<{
  name: string,
  desc?: string,
  selected: boolean
}>()
</script>

<style scoped lang="scss">
.shipping-method-card:not(:last-child) {
  margin-bottom: 8px;
}

.shipping-method-card-inactive {
  cursor: pointer;
}

.shipping-method-card-active {
  cursor: auto;
}
</style>