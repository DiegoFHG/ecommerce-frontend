import useAPI from "../../composables/useAPI";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.cartToken) {
    const { data: cart } = await useAPI(`/carts/${body.cartToken}`);

    if (cart.id === body.cartId) {
      const { cartToken, cartId, ...rest } = body;
      const { data: newOrder } = await useAPI("orders/", {
        method: "POST",
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
