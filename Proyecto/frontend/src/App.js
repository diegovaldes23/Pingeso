import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductSlider from './components/Slider';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage'; // Importa la página de inicio de sesión
import RegisterPage from './pages/RegisterPage'; // Importa la página de registro
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <ProductSlider />
              <ProductList />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
