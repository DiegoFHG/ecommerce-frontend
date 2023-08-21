<template>
  <div class="page-container">
    <h1 class="mb-10">Checkout</h1>
    <div>
      <v-card class="card-items">
        <div class="checkout-products">
          <h3 class="mb-5">Products</h3>
          <ProductList :items="cartItems" />
        </div>
        <v-divider vertical v-show="!orientation" />
        <v-divider v-show="orientation" />
        <div class="checkout-form">
          <h3>Shipping</h3> 
          <h4 class="mb-5 mt-5">Shipping information</h4>
          <v-form>
            <div class=checkout-form-address>
              <v-text-field label="Address line 1" />
              <v-text-field label="Address line 2" />
              <v-text-field label="Zip/Postal code" />
            </div>
            <div class="checkout-form-address-country">
              <v-text-field label="State/Province/Division" />
              <v-text-field label="City" />
              <v-text-field label="Country" />
            </div>
            <div class="checkout-form-recipient">
              <v-text-field label="Recipient's name" />
              <v-text-field label="Recipient's email" />
              <v-text-field label="Recipient's phone number" />
            </div>
          </v-form>
          <h4 class="mb-5">Shipping method</h4>
          <template v-for="shippingType in shippingTypes">
            <MethodTypeCard :name="shippingType.name" :selected="true" />
          </template>
          <v-divider class="mb-5 mt-5" />
          <h3 class="mb-5">Payment information</h3>
          <h4 class="mb-5">Payment method</h4>
          <template v-for="paymentType in paymentTypes">
            <MethodTypeCard :name="paymentType.name" :selected="true" />
          </template>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { ShippingType, PaymentType } from 'types';

definePageMeta({
  middleware: 'cart'
})

onMounted(() => {
  window.addEventListener('resize', () => windowWidth.value = window.innerWidth)
})

const store = cartStore()
const { products: cartItems } = storeToRefs(store)
let windowWidth = ref(window.innerWidth)
const orientation = computed(() => windowWidth.value < 960)

const [{ data: shippingTypes }, { data: paymentTypes }] = await Promise.all([
  useAPI<ShippingType[]>('/shipping-types'),
  useAPI<PaymentType[]>('/payment-types')
])
</script>

<styles scoped lang="scss">
.checkout-products { 
  display: flex;
  flex-direction: column;
  flex: 1;
}

.checkout-form {
  display: flex; flex-direction: column; flex: 1.5;
}

.card-items {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (min-width: 600px) and (max-width: 960px) {
    flex-direction: column;
  }
}

.checkout-form-address {
  display: grid;
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.checkout-form-address-country {
  display: grid;
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.checkout-form-recipient {
  display: grid;
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</styles>