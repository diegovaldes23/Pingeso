import React, { useState } from 'react';
import './AddProductPage.css';

function AddProductPage() {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [dimensions, setDimensions] = useState({ depth: '', width: '', height: '' });
    const [promoPrice, setPromoPrice] = useState('');
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes enviar los datos a tu backend o realizar alguna acción
        console.log({ productName, category, price, stock, description, weight, dimensions, promoPrice, images });
    };

    return (
        <div className="add-product-container">
            <form className="add-product-form" onSubmit={handleSubmit}>
                <h2>Agregar Producto</h2>
                <label>Nombre del producto</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />

                <label>Categoría</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Seleccione categoría</option>
                    {/* Agrega aquí las opciones de categorías */}
                </select>

                <label>Precio</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                <label>Stock</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />

                <label>Descripción del producto</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Peso</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

                <label>Dimensiones (cm)</label>
                <input type="number" placeholder="Profundidad" value={dimensions.depth} onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })} />
                <input type="number" placeholder="Ancho" value={dimensions.width} onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })} />
                <input type="number" placeholder="Alto" value={dimensions.height} onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })} />

                <label>Fotos</label>
                <input type="file" multiple onChange={handleImageUpload} />

                <label>Precio promocional (opcional)</label>
                <input type="number" value={promoPrice} onChange={(e) => setPromoPrice(e.target.value)} />

                <button type="submit">Agregar producto</button>
                <button type="button" onClick={() => console.log('Cancelar')}>Cancelar</button>
            </form>
        </div>
    );
}

export default AddProductPage;
