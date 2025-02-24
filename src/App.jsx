import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getProducts } from './redux/services/productService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './components/home/Home';
import Details from './components/product/Details';
import UpdateProduct from './components/product/UpdateProduct';
import CreateProduct from './components/product/CreateProduct';
import NavBar from './components/main/NavBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Details />} />
        <Route path='/update' element={<UpdateProduct />} />
        <Route path='/create' element={<CreateProduct />} />
      </Routes>
    </Router>
  )
}

export default App;
