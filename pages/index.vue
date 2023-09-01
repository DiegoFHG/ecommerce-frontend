<script setup lang="ts">
</script>

<template>
  <div class="page-container">
    <h1 class="mb-10 font-weight-regular">Top products</h1>
    <product-grid :items="dataProducts.products" />
  </div>
</template>

<script setup lang="ts">
import { Product, AllProductsResponse } from '../types'

defineProps<{
  products: Product[]
}>()

const { data: products } = await useAPI('products/')
const dataProducts = products

</script>