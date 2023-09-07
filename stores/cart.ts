import { CartTokenResponse, Product } from "types"

interface Cart {
  token: string
  products: Product[]
  cartId: number | null
}

export const cartStore = defineStore("cart", {
  state: (): Cart => ({ token: "", products: <Product[]>[], cartId: null }),
  actions: {
    setCart(cart: CartTokenResponse) {
      this.token = cart.token
      this.products = cart.products
      this.cartId = cart.id
    }
  },
  getters: {
    gerProducts: (state) => state.products,
    getToken: (state) => state.token,
    getCartId: (state) => state.cartId
  }
})
