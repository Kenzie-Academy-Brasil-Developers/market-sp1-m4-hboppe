import { Request, Response } from "express";
import market from './database';
import { IProduct, IProductRequest } from "./interfaces";

const createProduct = (request: Request, response: Response): Response => {
  let number = market.length
  const productsRequest: Array<IProductRequest> = request.body;
  const dateIn365Days = new Date(new Date().setDate(new Date().getDate() + 365));
  const total = productsRequest.reduce((acc, product) => acc + (product).price, 0 );

  const newProductsArray: Array<IProduct> = productsRequest.map(product => {
    return {...product, id: ++number, expirationDate: dateIn365Days}
  })
  market.push(...newProductsArray);


  return response.status(201).json({
    total: total,
    marketProducts: newProductsArray
  })
}

const retrieveAllProducts = (request: Request, response: Response): Response => {
  const total = market.reduce((acc, product) => acc + product.price, 0);

  return response.status(200).json({
    total: total,
    marketProducts: market
  })
}

const retrieveProduct = (request: Request, response: Response): Response => {
  const productIndex = response.locals.market.productIndex;
  const product = market[productIndex];

  return response.status(200).json(product)
}

export {
  createProduct,
  retrieveAllProducts,
  retrieveProduct
}