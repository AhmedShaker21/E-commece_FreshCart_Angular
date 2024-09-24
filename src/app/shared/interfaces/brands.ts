export interface Brands {
  name:string
  data: Data
}

export interface Data {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
  __v: number
}
