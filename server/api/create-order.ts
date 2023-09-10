import { CartTokenResponse } from "../../types";

const baseURL = useRuntimeConfig().public.apiURL

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.cartToken) {
    const cart = await $fetch<CartTokenResponse>(`/carts/${body.cartToken}`, { baseURL });

    if (cart.id === body.cartId) {
      const { cartToken, cartId, ...rest } = body;
      const newOrder = await $fetch<CartTokenResponse>('orders/', {
        method: "POST",
        baseURL,
        body: {
          ...rest,
          cart: cart.id,
        },
      });

      return newOrder;
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
  });
});
