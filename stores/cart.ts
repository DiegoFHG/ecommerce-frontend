import { CartTokenResponse, Product } from "types"

export const cartStore = defineStore("cart", {
  state: () => ({ token: "", products: <Product[]>[] }),
  actions: {
    setCart(cart: CartTokenResponse) {
      this.token = cart.token
      this.products = cart.products
    }
  },
  getters: {
    gerProducts: (state) => state.products,
    getToken: (state) => state.token
  }
})
