<template>
  <v-app>
    <v-app-bar class="navbar" :elevation="1">
      <NuxtLink to="/">
        <v-icon size="x-large" color="teal">mdi-shopping-outline</v-icon>
      </NuxtLink>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" color="teal">Categories</v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in categories" :key="index" v-ripple class="category-list-item">
            <v-list-item-title @click="goToCategoryPage(item.id)">{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-btn icon color="teal" @click="openCartDialog()">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon color="teal">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
    <v-dialog v-model="fullScreenDialog" fullscreen scrollable>
      <v-card>
        <v-toolbar color="teal">
          <v-btn icon @click="fullScreenDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Shopping cart</v-toolbar-title>
        </v-toolbar>
        <CartItemList :items="cartItems" />
        <div class="pr-5 pl-5">
          <v-btn size="x-large" variant="flat" block color="teal">Order</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="screenDialog" scrollable persistent width="900">
      <v-card>
        <v-card-title>Shopping cart</v-card-title>
        <CartItemList :items="cartItems" />
        <v-card-actions>
          <v-spacer />
          <v-btn @click="screenDialog = false" color="teal">Order</v-btn>
          <v-btn @click="screenDialog = false" color="teal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup lang="ts">
import { CartTokenResponse, Category } from 'types'

const { data } = await useAPI<Category[]>(`categories`)
const categories = ref(data)
const fullScreenDialog = ref(false)
const screenDialog = ref(false)
const cartItems = ref()

const cartToken = useCookie('ct')
cartToken.value = cartToken.value || undefined

if (cartToken.value !== undefined) {
  const { data: cart } = await useAPI<CartTokenResponse>(`carts/${cartToken.value}`)

  if (cart) {
    cartItems.value = cart.value?.products
  }
}

async function goToCategoryPage(id: number) {
  await navigateTo(`/categories/${id}`)
}

function openCartDialog() {
  const width = window.innerWidth

  if (width < 900) {
    fullScreenDialog.value = true
  } else {
    screenDialog.value = true
  }
}
</script>

<styles scoped lang="scss">
@import "@/assets/scss/shared.scss";

.category-list-item {
  cursor: pointer;
}
</styles>