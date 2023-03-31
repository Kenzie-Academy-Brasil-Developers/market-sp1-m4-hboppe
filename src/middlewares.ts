import { NextFunction, Request, Response } from "express";
import market from './database';
import { IPrice, IProduct, IProductRequest } from "./interfaces";

const ensureProductsNamesAreUnique = (request: Request, response: Response, next: NextFunction): Response | void => {
  const productRequest: Array<IProductRequest> | IProductRequest = request.body;
  let itIsDuplicated = false;

  if(request.method === 'POST' ){
    (productRequest as Array<IProductRequest>).forEach(product => {
      market.forEach(marketProduct => {
        if(product.name === marketProduct.name){
          itIsDuplicated = true;
        }
      })
    });

  } else if(request.method === 'PATCH'){
    itIsDuplicated = market.some(product => product.name === (productRequest as IProductRequest).name)
  }
  
  if(itIsDuplicated){
    return response.status(409).json({error: "Product already registered"});
  }

  return next()

}

const ensureProductIdExists = (request: Request, response: Response, next: NextFunction): Response | void => {

  const id = Number(request.params.id);
  const productIndex = market.findIndex(product => product.id === id)

  if(productIndex === -1){
    return response.status(404).json({
      "error": "Product not found"
    }) 
  }

  response.locals.market = {
    productIndex: productIndex
  }

  return next()
  
}


export {
  ensureProductsNamesAreUnique,
  ensureProductIdExists
}