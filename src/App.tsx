import { useEffect, useState } from 'react'
import { notification } from 'antd'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Website from './pages/layout/Website'

// api
import { addCategories, delCategories, getAllCategories, updateCategories } from './api/category'
import { addProduct, delProduct, getAll, updateProduct } from './api/products'

// type
import { Iproducts } from './pages/types/products'
import { ICategories } from './pages/types/categories'

// products administration
import UpdateProduct from './pages/admin/product/UpdateProduct'
import ListProducts from './pages/admin/product/ListProducts'
import AddProduct from './pages/admin/product/AddProduct'

// produts page
import ProductDetail from './pages/ProductDetail'
import ProductsPage from './pages/ProductsPage'

// administration
import Admin from './pages/layout/Admin'
import AdminPage from './pages/admin/dashboard/AdminPage'

// category
import AddCategory from './pages/admin/category/AddCategory'
import Categories from './pages/admin/category/Categories'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import HomePage from './pages/HomePage'

function App() {
  // products
  const [products, setProduct] = useState([])
  // Get All
  useEffect(() => {
    getAll().then(({ data }) => setProduct(data.products))
  }, [])
  console.log('products :>> ', products);
  // remove product
  const onHandleRemove = (id: number) => {
    delProduct(id).then(() => setProduct(products.filter((item: Iproducts) => item._id !== id)))
  }
  // update product
  const onHandleUpdate = (product: Iproducts) => {
    updateProduct(product).then(() => {
      // getAll().then(({ data }) => setProduct(data))
      location.reload();
    })
  }
  // add product
  const onHandleAdd = (product: Iproducts) => {
    // console.log('add product :>> ', product);
    addProduct(product).then(() => {
      location.reload();
    })
  }
  // Category
  const [categories, setCategories] = useState([])
  // Get All Categories
  useEffect(() => {
    getAllCategories().then(({ data }) => setCategories(data.categories))
  }, [])
  // console.log('categories :>> ', categories);
  // Remove Category
  const onHandleRemoveCategories = (id: number) => {
    delCategories(id).then(() => setCategories(categories.filter((item: ICategories) => item._id !== id)))
  }
  // Add Category
  const onHandleAddCategory = (categories: ICategories) => {
    addCategories(categories).then(() => {
      // getAllCategories().then(({ data }) => setCategories(data))
      location.reload();
    })
  }
  // Update Category
  const onHandleUpdateCategory = (categories: ICategories) => {
    updateCategories(categories).then(() => {
      // getAllCategories().then(({ data }) => setCategories(data))
      location.reload();
    })
  }
  // Display
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Website />}>
          <Route index element={<HomePage products={products} categories={[]} />} />
          <Route path='products'  >
            <Route index element={<ProductsPage products={products} categories={[]} />} />
            <Route path=':id' element={<ProductDetail products={products} />} />
          </Route>
        </Route>
        {/* admin */}
        <Route path='/admin' element={<Admin />} >
          <Route index element={<AdminPage products={products} category={categories} />} />
          <Route path='products' >
            <Route index element={<ListProducts products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProduct onAdd={onHandleAdd} category={categories} />} />
            <Route path=':id/update' element={<UpdateProduct onUpdate={onHandleUpdate} products={products} category={categories} />} />
          </Route>
          <Route path='category' >
            <Route index element={<Categories category={categories} onRemoveCategory={onHandleRemoveCategories} />} />
            <Route path='add' element={<AddCategory onAddCategory={onHandleAddCategory} categories={categories} />} />
            <Route path=':id/update' element={<UpdateCategory onUpdateCategory={onHandleUpdateCategory} categories={categories} />} />
          </Route>
        </Route>
      </Routes>
    </div >
  )
}

export default App
