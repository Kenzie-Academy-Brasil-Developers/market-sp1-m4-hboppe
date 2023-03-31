interface IProduct extends IProductRequest{
  id: number,
  expirationDate: Date
}

interface ICleaningProduct extends IProduct{};

interface IFoodProduct extends IProduct {
  calories: number
}

interface IProductRequest {
  name: string,
  price: number,
  weight: number,
  section: "food" | "cleaning",
  calories?: number
}

interface IPrice {
  price: number;
}

export { IProduct, ICleaningProduct, IFoodProduct, IProductRequest, IPrice}