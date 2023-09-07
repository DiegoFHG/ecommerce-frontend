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

export type CartTokenResponse = {
  products: Product[]
  token: string
  id: number
}

export type Category = {
  id: number
  name: string
}

type OrderDetails = {
  line: string
  city: string
  division: string
  country: string
  postal_code: string
  recipient_email: string
  recipient_name: string
  recipient_phone_number: string
  total: number
  currency: Currency
}

type OrderStatus = {
  id: number
  name: string
}

export type Order = {
  id: number
  token: string
  status: OrderStatus
  products: Product[]
  details: OrderDetails
}

export type Product = {
  id: number
  name: string
  desc?: string
  img?: string
  price: number
  quantity: number
  discountPrice?: number
  currency: Currency
  categories: Category[]
}

export type CategoryTreeResponse = {
  data: Category[]
}

export type AllProductsResponseData = {
  products: Product[]
}

export type ProductResponse = {
  data: Product
}

export type AllProductsResponse = {
  data: AllProductsResponseData
}

export type ShippingType = {
  id: number
  name: string
}

export type PaymentType = {
  id: number
  name: string
}