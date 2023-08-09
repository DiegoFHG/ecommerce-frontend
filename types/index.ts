type Currency = {
  id: Number
  name: string
  symbol: string
}

export type Product = {
  id: number
  name: string
  desc?: string
  img?: string
  price: number
  discountPrice?: number
  currency: Currency
}

type AllProductsResponseData = {
  products: Product[]
}

export type ProductResponse = {
  data: Product
}

export type AllProductsResponse = {
  data: AllProductsResponseData
}