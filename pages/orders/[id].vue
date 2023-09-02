<template>
  <div class="page-container">
    <h1 class="mb-5 font-weight-regular">Order #{{ data?.id }}</h1>
    <h2 class="mb-3 font-weight-regular">Status: {{ data?.status.name }}</h2>
    <v-divider class="mb-5" />
    <h3 class="mb-3 font-weight-regular">Order details</h3>
    <div class="order-details">
      <span><b>Shipping address: </b>{{ data?.details.line }}</span>
      <span><b>City: </b>{{ data?.details.city }}</span>
      <span><b>State/Province/Division: </b>{{ data?.details.division }}</span>
      <span><b>Postal code: </b>{{ data?.details.postal_code }}</span>
    </div>
    <v-divider class="mb-5" />
    <h3 class="mb-3 font-weight-regular">Products</h3>
    <ProductList :items="data.products" :show-item-price="false" />
    <div class="order-total">
      <v-spacer />
      <h4 class="font-weight-regular"><b>Total:</b> {{ data?.details.total.toFixed(2) }} {{ data?.details.currency.symbol }}</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Order } from 'types';

const route = useRoute()
const { data } = await useAPI<Order>(`orders/${route.params.id}`)
</script>

<styles scoped lang="scss">
.order-details {
  display: flex;
  flex-direction: column;
}

.order-total {
  display: flex;
}
</styles>