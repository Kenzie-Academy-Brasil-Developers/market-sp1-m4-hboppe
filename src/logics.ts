import { Request, Response } from "express";
import market from './database';
import { IFilteredProductRequest, IProduct, IProductRequest } from "./interfaces";

const createProduct = (request: Request, response: Response): Response => {
  let number = market.length;
  const productsRequest: Array<IProductRequest> = request.body;
  const dateIn365Days = new Date(new Date().setDate(new Date().getDate() + 365));
  const total = productsRequest.reduce((acc, product) => acc + (product).price, 0 );

  const newProductsArray: Array<IProduct> = productsRequest.map(product => {
    return {id: ++number,...product, expirationDate: dateIn365Days};
  })
  market.push(...newProductsArray);


  return response.status(201).json({
    total: total,
    marketProducts: newProductsArray
  });
}

const retrieveAllProducts = (request: Request, response: Response): Response => {
  const total = market.reduce((acc, product) => acc + product.price, 0);

  return response.status(200).json({
    total: total,
    marketProducts: market
  });
}

const retrieveProduct = (request: Request, response: Response): Response => {
  const productIndex = response.locals.market.productIndex;
  const product = market[productIndex];
  const teste = {
    ...product,
    expirationDate: product.expirationDate.toISOString(),
  };

  return response.status(200).json(teste);
}

const updateProduct = (request: Request, response: Response): Response => {
  const productRequest = request.body;
  const productIndex = Number(response.locals.market.productIndex);

  for(const key in productRequest){
    if(key === 'id' || key === 'expirationDate'){
      delete productRequest[key];
    }
  }  
  
  market[productIndex] = {
    ...market[productIndex],
    ...productRequest
  };
  
  return response.status(200).json(market[productIndex]);

}

const deleteProduct = (request: Request, response: Response): Response => {
  const productIndex = Number(response.locals.market.productIndex);

  market.splice(productIndex, 1);
  return response.status(204).json();

}

export {
  createProduct,
  retrieveAllProducts,
  retrieveProduct,
  updateProduct,
  deleteProduct
}