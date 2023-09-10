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
          <form>
            <div class=checkout-form-address>
              <v-text-field label="Address line 1" required :model-value="state.line" 
                @change="state.line = $event.target.value" @blur="v$.line.$touch" :error-messages="v$.line.$errors.map(e => e.$message)" />
              <v-text-field label="Address line 2" :model-value="state.line_2" @blur="v$.line_2.$touch"
                @change="state.line_2 = $event.target.value" :error-messages="v$.line_2.$errors.map(e => e.$message)" />
              <v-text-field label="Zip/Postal code" required :model-value="state.postal_code" 
                @change="state.postal_code = $event.target.value" @blur="v$.postal_code.$touch" :error-messages="v$.postal_code.$errors.map(e => e.$message)" />
            </div>
            <div class="checkout-form-address-country">
              <v-text-field label="State/Province/Division" required :model-value="state.division"
                @change="state.division = $event.target.value" @blur="v$.division.$touch" :error-messages="v$.division.$errors.map(e => e.$message)" />
              <v-text-field label="City" required :model-value="state.city" @blur="v$.city.$touch"
                @change="state.city = $event.target.value" :error-messages="v$.city.$errors.map(e => e.$message)" />
              <v-text-field label="Country" required :model-value="state.country"
                @change="state.country = $event.target.value" @blur="v$.country.$touch" :error-messages="v$.country.$errors.map(e => e.$message)" />
            </div>
            <div class="checkout-form-recipient">
              <v-text-field label="Recipient's name" required :model-value="state.recipient_name"
                @change="state.recipient_name = $event.target.value" @blur="v$.recipient_name.$touch"
                :error-messages="v$.recipient_name.$errors.map(e => e.$message)" />
              <v-text-field label="Recipient's email" :model-value="state.recipient_email" 
                @change="state.recipient_email = $event.target.value" @blur="v$.recipient_email.$touch" :error-messages="v$.recipient_email.$errors.map(e => e.$message)" />
              <v-text-field label="Recipient's phone number" :model-value="state.recipient_phone_number"
                @change="state.recipient_phone_number = $event.target.value"  @blur="v$.recipient_phone_number.$touch"
                :error-messages="v$.recipient_phone_number.$errors.map(e => e.$message)" />
            </div>
          </form>
          <h4 class="mb-5">Shipping method</h4>
          <template v-for="shippingType in shippingTypes">
            <MethodTypeCard :name="shippingType.name" @click="state.shipping_type = shippingType.id"
              :selected="state.shipping_type === shippingType.id" />
          </template>
          <v-divider class="mb-5 mt-5" />
          <h3 class="mb-5">Payment information</h3>
          <h4 class="mb-5">Payment method</h4>
          <template v-for="paymentType in paymentTypes">
            <MethodTypeCard :name="paymentType.name" @click="state.payment_type = paymentType.id"
              :selected="state.payment_type === paymentType.id" />
          </template>
          <div class="d-flex mt-5">
            <v-spacer />
            <v-btn
              variant="flat"
              color="teal"
              :disabled="v$.$invalid || submittingOrder"
              :loading="submittingOrder"
              @click="submitOrder()"
            >
              Order
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cartStore } from '@/stores/cart'
import { useVuelidate } from '@vuelidate/core';
import { email, maxLength, minLength, required } from '@vuelidate/validators';
import { storeToRefs } from 'pinia'
import { ShippingType, PaymentType, Order } from 'types';

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
const initialState = {
  line: null,
  line_2: null,
  postal_code: null,
  division: null,
  city: null,
  country: null,
  recipient_name: null,
  recipient_email: null,
  recipient_phone_number: null,
  shipping_type: 1,
  payment_type: 1
}
const submittingOrder = ref(false)

const state = reactive({ ...initialState })

const [{ data: shippingTypes }, { data: paymentTypes }] = await Promise.all([
  useAPI<ShippingType[]>('shipping-types/'),
  useAPI<PaymentType[]>('payment-types/')
])

const rules = {
  line: { required, minLengthValue: minLength(1) },
  line_2: { minLength: minLength(1) },
  postal_code: { required, maxLengthValue: maxLength(12) },
  division: { required },
  city: { required },
  country: { required },
  recipient_name: { required, minLengthValue: minLength(1) },
  recipient_email: { email },
  recipient_phone_number: { maxLengthValue: maxLength(15) }
}

const v$ = useVuelidate(rules, state, { $lazy: true })

async function submitOrder() {
  const validForm = await v$.value.$validate()
  submittingOrder.value = true

  if (validForm && state.shipping_type !== null && state.payment_type !== null) {
    const { data: order, status } = await useFetch<Order>('/api/create-order', { method: 'POST', server: false, body: {
      ...state,
      cartToken: store.getToken ?? null,
      cartId: store.getCartId ?? null
    } })

    if (status.value === 'success') {
      store.clearCart()
      
      navigateTo(`/orders/${order.value?.id}`)
    }
  }

  submittingOrder.value = false
}
</script>

<styles scoped lang="scss">
.checkout-products {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  flex: 1.5;
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