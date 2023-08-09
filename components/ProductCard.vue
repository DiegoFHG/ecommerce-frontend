<template>
  <v-card width="350" v-ripple class="product-card">
    <div>
      <v-img :src="img ? img : ''" max-height="200" height="200">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey">
            <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
          </div>
        </template>
      </v-img>
    </div>
    <div class="pa-3">
      <div>
        <h3>{{ name }}</h3>
      </div>
      <div>
        <span>{{ desc ? desc : 'No description' }}</span>
      </div>
      <span>
        {{ price }} €
      </span>
    </div>

  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  desc?: string
  img?: string
  price: number
}>()
</script>

<style scoped lang="scss">
.product-card {
  cursor: pointer;
}
</style>