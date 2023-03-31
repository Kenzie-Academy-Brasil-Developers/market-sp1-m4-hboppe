import express, {Application, Request, Response} from 'express';
import { createProduct, deleteProduct, retrieveAllProducts, retrieveProduct, updateProduct } from './logics';
import { ensureProductsNamesAreUnique, ensureProductIdExists } from './middlewares';

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

app.patch('/products/:id',
  ensureProductsNamesAreUnique,
  ensureProductIdExists,
  updateProduct
)

app.delete('/products/:id',
  ensureProductIdExists,
  deleteProduct
)