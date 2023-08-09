type Currency = {
  id: Number
  name: string
  symbol: string
}

export type Token = {
  token: string
}

export type CreateTokenCartResponse = {
  token: string
}

export type Category = {
  id: number
  name: string
}

export type Product = {
  id: number
  name: string
  desc?: string
  img?: string
  price: number
  discountPrice?: number
  currency: Currency
  categories: Category[]
}

export type CategoryTreeResponse = {
  data: Category[]
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