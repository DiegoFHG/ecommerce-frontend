<template>
  <div class="page-container">
    <category-tree v-if="hasCategory" :items="items" />
    <div class="product-card d-sm-flex">
      <v-img :src="data?.img" height="500" width="400" max-width="450" max-height="500" class="border">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height bg-grey">
            <v-progress-circular indeterminate color="grey-lighten-4"></v-progress-circular>
          </div>
        </template>
      </v-img>
      <div>
        <h1>{{ data?.name }}</h1>
        <h3>{{ data?.price }} {{ data?.currency.symbol }}</h3>
        <span>
          {{  data?.desc  }}
        </span>
        <div class="d-flex">
          <div class="product-quantity-picker-container bg-grey-lighten-3 mt-3 mb-3">
            <div class="product-quantity-picker">
              <v-btn icon="mdi-minus" variant="plain" :disabled="productQuantity === 1" @click="changeProductQuantity(false)" />
              <span class="text-h6">{{ productQuantity }}</span>
              <v-btn icon="mdi-plus" variant="plain" :disabled="productQuantity === data?.quantity" @click="changeProductQuantity(true)" />
            </div>
          </div>
          <span class="ml-3 d-flex align-center">{{ data?.quantity }} in stock</span>
        </div>
        <div class="product-actions">
          <v-btn variant="flat" size="large" color="teal" rounded @click="buyProductNow()">Buy now</v-btn>
          <v-btn variant="outlined" size="large" color="teal" rounded @click="addProductToCart()">Add to cart</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product, Category, CartTokenResponse } from '../../types'
import { cartStore } from '@/stores/cart'

const route = useRoute()
const store = cartStore()
const { data } = await useAPI<Product>(`products/${route.params.id}`)
let items: any
let hasCategory = false
let productQuantity = ref(1)

const cartToken = useCookie('ct')
cartToken.value = cartToken.value || undefined

if (data.value && data.value.categories[0] !== undefined) {
  const { data: tree } = await useAPI<Category[]>(`categories/${data.value.categories[0].id}/tree`)

  items = tree

  hasCategory = true
}

function changeProductQuantity(add: boolean) {
  if ((productQuantity.value < data.value?.quantity) && add) {
    productQuantity.value += 1
  } 

  if (productQuantity.value !== 1 && !add) productQuantity.value -= 1
}

async function addProductToCart() {
  if (cartToken.value) {
    const { data: cartData, status } = await useAPI<CartTokenResponse>(`carts/${cartToken.value}/products`, { method: 'POST', body: {
      product: data.value?.id,
      quantity: productQuantity.value
    } })

    if (status.value === 'success' && cartData.value) {
      store.setCart(cartData.value)
    }
  }
}

async function buyProductNow() {
  if (cartToken.value) {
    const { data: cartData, status } = await useAPI<CartTokenResponse>(`carts/${cartToken.value}/products`, { method: 'POST', body: {
      product: data.value?.id,
      quantity: productQuantity.value
    } })

    if (status.value === 'success' && cartData.value) {
      store.setCart(cartData.value)
      navigateTo('/checkout')
    }
  }
}

</script>

<style scoped lang="scss">
.product-card {
  gap: 30px;
}

.product-quantity-picker-container {
  width: fit-content;
  border-radius: 60px;
}

.product-quantity-picker {
  display: flex;
  gap: 10px;

  span {
    vertical-align: middle;
    align-self: center;
  }
}

.product-actions {
  display: flex;
  gap: 10px;
}
</style>