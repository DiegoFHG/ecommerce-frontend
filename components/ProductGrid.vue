<template>
  <div class="product-grid">
    <template v-for="product in items">
      <NuxtLink :to="`/products/${product.id}`" class="card-link">
        <ProductCard :name="product.name" :desc="product.desc" :price="product.price" :img="product.img"/>
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Product } from '../types'

defineProps<{
  items: Product[]
}>()
</script>

<style scoped lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 10px;
  row-gap: 50px;
  justify-content: space-evenly;
  justify-items: center;
  align-content: space-evenly;
  align-items: center;
}

.card-link {
  text-decoration: none;
}
</style>