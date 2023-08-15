<template>
  <div class="page-container">
    <h1 class="mb-10 font-weight-regular">{{ category.name }}</h1>
    <ProductGrid :items="products" />
  </div>
</template>

<script setup lang="ts">
import { AllProductsResponseData, Category } from 'types'

const route = useRoute()
const { data: category } = await useAPI<Category>(`categories/${route.params.id}`)
let products: any

if (category) {
  const { data } = await useAPI<AllProductsResponseData>(`categories/${route.params.id}/products`)

  if (data.value) {
    products = data.value.products
  }
}
</script>
