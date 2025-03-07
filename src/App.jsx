import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/web/home/Home';
import Details from './components/web/product/Details';
import UpdateProduct from './components/web/product/UpdateProduct';
import CreateProduct from './components/web/product/CreateProduct';
import ProtectedRoutes from './components/ProtectedRoute';
import Login from './components/pages/Login';

function App() {
  const protectedRoutes = [
    { path: '*', element: <Login /> },
    { path: '/home', element: <Home /> },
    { path: '/about', element: <Details /> },
    { path: '/create', element: <CreateProduct /> },
    { path: '/update', element: <UpdateProduct /> },
  ];

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<ProtectedRoutes routes={protectedRoutes} />} />
      </Routes>
    </Router>
  )
}

export default App;
