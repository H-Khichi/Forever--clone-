import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Orders from './pages/Orders'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ToastContainer/>
        <Navbar/>
        <SearchBar/>
          <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/collection' element={<Collection />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/product/:productId' element={<Product />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/place-order' element={<PlaceOrder />}/>
          <Route path='/order' element={<Orders />}/>
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;

      
