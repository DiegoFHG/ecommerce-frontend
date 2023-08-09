export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    setCookie(event, 'ct', body.key, {
      path: '/',
    })

    return { cookie_added: true }
  } catch {
    return { cookie_added: false }
  }
})