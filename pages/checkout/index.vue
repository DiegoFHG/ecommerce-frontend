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
              <v-text-field label="Address line 1" required v-model="state.line" @input="v$.line.$touch"
                @blur="v$.line.$touch" :error-messages="v$.line.$errors.map(e => e.$message)" />
              <v-text-field label="Address line 2" v-model="state.line2" @input="v$.line2.$touch" @blur="v$.line2.$touch"
                :error-messages="v$.line2.$errors.map(e => e.$message)" />
              <v-text-field label="Zip/Postal code" required v-model="state.postalCode" @input="v$.postalCode.$touch"
                @blur="v$.postalCode.$touch" :error-messages="v$.postalCode.$errors.map(e => e.$message)" />
            </div>
            <div class="checkout-form-address-country">
              <v-text-field label="State/Province/Division" required v-model="state.division" @input="v$.division.$touch"
                @blur="v$.division.$touch" :error-messages="v$.division.$errors.map(e => e.$message)" />
              <v-text-field label="City" required v-model="state.city" @input="v$.city.$touch" @blur="v$.city.$touch"
                :error-messages="v$.city.$errors.map(e => e.$message)" />
              <v-text-field label="Country" required v-model="state.country" @input="v$.country.$touch"
                @blur="v$.country.$touch" :error-messages="v$.country.$errors.map(e => e.$message)" />
            </div>
            <div class="checkout-form-recipient">
              <v-text-field label="Recipient's name" required v-model="state.recipientName"
                @input="v$.recipientName.$touch" @blur="v$.recipientName.$touch"
                :error-messages="v$.recipientName.$errors.map(e => e.$message)" />
              <v-text-field label="Recipient's email" v-model="state.recipientEmail" @input="v$.recipientEmail.$touch"
                @blur="v$.recipientEmail.$touch" :error-messages="v$.recipientEmail.$errors.map(e => e.$message)" />
              <v-text-field label="Recipient's phone number" v-model="state.recipientPhoneNumber"
                @input="v$.recipientPhoneNumber.$touch" @blur="v$.recipientPhoneNumber.$touch"
                :error-messages="v$.recipientPhoneNumber.$errors.map(e => e.$message)" />
            </div>
          </form>
          <h4 class="mb-5">Shipping method</h4>
          <template v-for="shippingType in shippingTypes">
            <MethodTypeCard :name="shippingType.name" @click="state.shippingType = shippingType.id"
              :selected="state.shippingType === shippingType.id" />
          </template>
          <v-divider class="mb-5 mt-5" />
          <h3 class="mb-5">Payment information</h3>
          <h4 class="mb-5">Payment method</h4>
          <template v-for="paymentType in paymentTypes">
            <MethodTypeCard :name="paymentType.name" @click="state.paymentType = paymentType.id"
              :selected="state.paymentType === paymentType.id" />
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
const initialState = {
  line: null,
  line2: null,
  postalCode: null,
  division: null,
  city: null,
  country: null,
  recipientName: null,
  recipientEmail: null,
  recipientPhoneNumber: null,
  shippingType: 1,
  paymentType: 1
}
const submittingOrder = ref(false)

const state = reactive({ ...initialState })

const [{ data: shippingTypes }, { data: paymentTypes }] = await Promise.all([
  useAPI<ShippingType[]>('shipping-types/'),
  useAPI<PaymentType[]>('payment-types/')
])

const rules = {
  line: { required, minLengthValue: minLength(1) },
  line2: { minLength: minLength(1) },
  postalCode: { required, maxLengthValue: maxLength(12) },
  division: { required },
  city: { required },
  country: { required },
  recipientName: { required, minLengthValue: minLength(1) },
  recipientEmail: { email },
  recipientPhoneNumber: { maxLengthValue: maxLength(15) }
}

const v$ = useVuelidate(rules, state)

async function submitOrder() {
  const validForm = await v$.value.$validate()
  submittingOrder.value = true

  if (validForm && state.shippingType !== null && state.paymentType !== null) {
    console.log(state)
  }
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