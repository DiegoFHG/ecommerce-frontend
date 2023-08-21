import { cartStore } from "@/stores/cart"
import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware((to, from) => {
  const store = cartStore()
  const { products } = storeToRefs(store)

  if (!products.value || products.value.length === 0) {
    return navigateTo('/')
  }
})