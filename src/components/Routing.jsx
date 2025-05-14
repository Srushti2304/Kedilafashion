import React from 'react'
import { Route, Routes } from 'react-router'
import App from '../App'
import Home from './Home'
import About from './about'
import Products from './Products'
import Register from './Register'
import Login from './Login'
import Header from './Header'
import PageNotFound from './PageNotFound'
import Cart from './Cart'
import ProductDetails from './ProductDetails'
import AdminLayout from './Admin/AdminLayout'
import Dashboard from './Admin/Dashboard'
import ViewCategory from './Admin/ViewCategory'
import AddCategory from './Admin/AddCategory'
import AddProduct from './Admin/AddProduct'
import ViewProducts from './Admin/ViewProducts'
import Checkout from './Checkout'
import CheckoutPayment from './CheckoutPayment'
import Thankyou from './Thankyou'
import MyOrders from './MyOrders'
import MyOrderDetails from './MyOrderDetails'
import Orders from './Admin/Orders'
import OrderDetails from './Admin/OrderDetails'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Profile from './Profile'
import { Protected, ProtectedAdmin } from './hiddenlinks'
import ManageReviews from './Admin/ManageReviews'
import PrivacyPolicy from './PrivacyPolicy'
import ContactUs from './ContactUs'
import TrackOrder from './TrackOrder'
import TermsConditions from './TermsConditions'

const Routing = () => {
  return (
    <Routes>
    <Route path='/' element={<App/>}>
        <Route element={<Header/>}>
          <Route index element={<Home/>}></Route>
          <Route path='about' element={<About/>}/>
          <Route path='products' element={<Products/>} />
          <Route path='contact' element={<ContactUs/>} />
          <Route path='register' element={<Register/>} />
          <Route path='privacypolicy' element={<PrivacyPolicy/>} />
          <Route path='cart' element={<Cart/>} />
          <Route path='product/details/:id' element={<ProductDetails/>} />
          <Route path='checkout' element={<Checkout/>} />
          <Route path='checkoutpayment' element={<CheckoutPayment/>} />
          <Route path='thankyou' element={<Thankyou/>} />
          <Route path='TermsConditions' element={<TermsConditions/>} />
          <Route path='myorders' element={<Protected><MyOrders/></Protected>} />
          <Route path='myorders/details/:id' element={<Protected><MyOrderDetails/></Protected>} />
          <Route path='profile' element={<Protected><Profile/></Protected>} />
          <Route path='myorders/track/:id' element={<Protected><TrackOrder/></Protected>} />
         

        </Route>
  
        <Route path='login' element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path='admin' element={<ProtectedAdmin><AdminLayout/></ProtectedAdmin>}>
          <Route index element={<Dashboard/>}/>
          <Route path='categories' element={<ViewCategory/>}/>
          <Route path='categories/add' element={<AddCategory/>}/>
          <Route path='category/edit/:id' element={<AddCategory/>}/>
         
          <Route path='add' element={<AddProduct/>}/>
          <Route path='product/edit/:id' element={<AddProduct/>}/>

          <Route path='view' element={<ViewProducts/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='orders/:id' element={<OrderDetails/>}/>
          <Route path='reviews' element={<ManageReviews/>}/>

        </Route>
    </Route>

    <Route path="*" element={<PageNotFound/>}/>
</Routes>

  )
}

export default Routing