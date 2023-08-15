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
  row-gap: 100px;
  justify-content: space-between;
  justify-items: start;
  align-content: space-evenly;
  align-items: start;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    justify-content: space-evenly;
    justify-items: center;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-evenly;
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(auto-fill, minmax(380px, 0fr));
  }
}

.card-link {
  text-decoration: none;
}
</style>