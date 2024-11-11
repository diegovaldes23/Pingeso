// src/pages/AdminEditProductPage.js
import React from 'react';
import './AdminEditProduct.css';

function AdminEditProductPage() {
  return (
    <div className="admin-edit-product-page">
      <div className="category-bar">
        <a href="#helados" className="category-link active">Helados</a>
        <a href="#dulces" className="category-link">Dulces</a>
        <a href="#donas" className="category-link">Donas</a>
        <a href="#mas" className="category-link">Más</a>
      </div>

      <section id="helados" className="product-section">
        <h2>Helados</h2>
        <div className="product-list">
          <div className="product-item">
            <img src="/images/brownies.png" alt="Helado de Chocolate" className="product-image" />
            <h3>Helado de Chocolate</h3>
            <p>Exquisito helado de chocolate belga.</p>
            <p className="price">$12.900</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Helado de Vainilla" className="product-image" />
            <h3>Helado de Vainilla</h3>
            <p>Cremoso helado de vainilla.</p>
            <p className="price">$11.500</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Helado de Fresa" className="product-image" />
            <h3>Helado de Fresa</h3>
            <p>Helado de fresa con trozos naturales.</p>
            <p className="price">$10.900</p>
            <button className="edit-button">Editar</button>
          </div>
        </div>
      </section>

      <section id="dulces" className="product-section">
        <h2>Dulces</h2>
        <div className="product-list">
          <div className="product-item">
            <img src="/images/brownies.png" alt="Caramelos Frutales" className="product-image" />
            <h3>Caramelos Frutales</h3>
            <p>Surtido de caramelos con sabor a frutas.</p>
            <p className="price">$5.500</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Chocolate" className="product-image" />
            <h3>Chocolate</h3>
            <p>Delicioso chocolate oscuro.</p>
            <p className="price">$6.200</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Gomitas" className="product-image" />
            <h3>Gomitas</h3>
            <p>Gomitas de sabores variados.</p>
            <p className="price">$4.900</p>
            <button className="edit-button">Editar</button>
          </div>
        </div>
      </section>

      <section id="donas" className="product-section">
        <h2>Donas</h2>
        <div className="product-list">
          <div className="product-item">
            <img src="/images/brownies.png" alt="Dona de Chocolate" className="product-image" />
            <h3>Dona de Chocolate</h3>
            <p>Dona cubierta de chocolate.</p>
            <p className="price">$3.500</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Dona de Vainilla" className="product-image" />
            <h3>Dona de Vainilla</h3>
            <p>Dona con glaseado de vainilla.</p>
            <p className="price">$3.200</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Dona de Fresa" className="product-image" />
            <h3>Dona de Fresa</h3>
            <p>Dona cubierta con glaseado de fresa.</p>
            <p className="price">$3.000</p>
            <button className="edit-button">Editar</button>
          </div>
        </div>
      </section>

      <section id="mas" className="product-section">
        <h2>Más</h2>
        <div className="product-list">
          <div className="product-item">
            <img src="/images/brownies.png" alt="Brownie" className="product-image" />
            <h3>Brownie</h3>
            <p>Brownie de chocolate con nueces.</p>
            <p className="price">$4.500</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Cupcake" className="product-image" />
            <h3>Cupcake</h3>
            <p>Cupcake con frosting de vainilla.</p>
            <p className="price">$3.800</p>
            <button className="edit-button">Editar</button>
          </div>
          <div className="product-item">
            <img src="/images/brownies.png" alt="Macarons" className="product-image" />
            <h3>Macarons</h3>
            <p>Macarons de varios sabores.</p>
            <p className="price">$5.200</p>
            <button className="edit-button">Editar</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminEditProductPage;
