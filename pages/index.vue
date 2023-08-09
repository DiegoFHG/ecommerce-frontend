<script setup lang="ts">
</script>

<template>
  <v-container class="pt-md-10 pr-md-10 pl-md-10 pt-lg-16 pr-lg-10 pl-lg-10 pt-5 pr-5 pl-5">
    <h1 class="mb-10 font-weight-regular">Top products</h1>
    <product-grid :items="dataProducts.products" />
  </v-container>
</template>

<script setup lang="ts">
import { Product, AllProductsResponse } from '../types'

defineProps<{
  products: Product[]
}>()

const { data: products } = await useAPI('products')
const dataProducts = products

</script>