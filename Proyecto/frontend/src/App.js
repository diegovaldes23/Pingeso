// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import OrdersPage from './pages/OrdersPage';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/admin/orders" element={<OrdersPage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
