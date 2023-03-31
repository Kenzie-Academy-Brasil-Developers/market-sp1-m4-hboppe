import { NextFunction, Request, Response } from "express";
import market from './database';
import { IPrice, IProduct, IProductRequest } from "./interfaces";

const ensureProductsNamesAreUnique = (request: Request, response: Response, next: NextFunction): Response | void => {
  const products: Array<IProductRequest> = request.body;
  
  products.forEach(product => {
    market.forEach(marketProduct => {
      if(product.name === marketProduct.name){
        return response.status(409).json({error: "Product already registered"});
      }
    })
  });
  
  next()
}

const ensureProductIdExists = (request: Request, response: Response, next: NextFunction): Response | void => {
  const id = Number(request.params.id);
  const productIndex = market.findIndex(product => product.id === id);

  if(productIndex === -1){
    return response.status(404).json({
      error: 'Product not found'
    })
  }

  response.locals.market = {
    productIndex: productIndex
  }

  next()
}


export {
  ensureProductsNamesAreUnique,
  ensureProductIdExists
}