import express, {Application, Request, Response} from 'express';
import { createProduct, retrieveAllProducts, retrieveProduct } from './logics';
import { ensureProductIdExists, ensureProductsNamesAreUnique } from './middlewares';

const app: Application = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running')
})

app.post('/products', 
  ensureProductsNamesAreUnique, 
  createProduct
)

app.get('/products',
  retrieveAllProducts
)

app.get('/products/:id',
  ensureProductIdExists,
  retrieveProduct
)