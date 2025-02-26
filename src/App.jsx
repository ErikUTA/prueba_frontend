import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { getProducts } from './redux/services/productService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './components/web/home/Home';
import Details from './components/web/product/Details';
import UpdateProduct from './components/web/product/UpdateProduct';
import CreateProduct from './components/web/product/CreateProduct';
import NavBar from './components/web/main/NavBar';

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
