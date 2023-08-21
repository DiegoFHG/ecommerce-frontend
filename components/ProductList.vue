<template>
  <template v-for="(item, index) in list">
    <div class="list-item">
      <div>
        <v-img :src="item.img" max-height="100" height="100" width="100" max-width="100">
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height bg-grey"></div>
          </template>
        </v-img>
      </div>
      <div class="list-item-description">
        <b>{{ item.name }}</b>
        <span><b>Price unit: </b>{{ item.price.toFixed(2) }} {{ item.currency.symbol }}</span>
        <span><b>Quantity: </b>{{ item.quantity }}</span>
      </div>
    </div>
    <v-divider class="mb-3 mt-3" v-if="(index + 1) !== list.length" thickness="2"></v-divider>
  </template>
  <div class="cart-total">
    <span><b>Subtotal: </b>{{ totalPrice.toFixed(2) }} {{ items[0].currency.symbol }}</span>
  </div>
</template>

<script setup lang="ts">
import { Product } from 'types'

const props = defineProps<{
  items: Product[]
}>()

const list = ref(props.items)
const totalPrice = computed(() => {
  let total = 0

  list.value.forEach((product) => total += (product.price * product.quantity))

  return (Math.round(total * 100) / 100)
})
</script>

<style scoped lang="scss">
.no-items-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.list-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.list-item {
  display: flex;
  flex-direction: row;
}

.list-item-description {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.list-item-subtotal {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-total {
  display: flex;
  margin-top: 5px;
  justify-content: flex-end;
}
</style>