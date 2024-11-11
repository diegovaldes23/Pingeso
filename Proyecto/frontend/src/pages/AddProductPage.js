import React, { useState } from 'react';

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
        console.log({ productName, category, price, stock, description, weight, dimensions, promoPrice, images });
    };

    return (
        <div className="flex justify-center items-center bg-gray-50 min-h-screen">
            <form className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold mb-6">Agregar producto</h2>

                {/* Nombre y Categoría */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Nombre del producto</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: Donuts de chocolate"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">Seleccione categoría</option>
                            {/* Agrega aquí las opciones de categorías */}
                        </select>
                    </div>
                </div>

                {/* Precio y Stock */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700">Precio</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="$ 15000"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="mt-1 w-full border border-gray-300 rounded-md p-2"
                            placeholder="Ej: 10"
                        />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción del producto</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="Ej: Donuts bañados en chocolate blanco y negro."
                    />
                </div>

                {/* Peso y Dimensiones */}
                <div className="mb-4">
                    <label className="block text-gray-700">Peso y dimensiones</label>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Peso (kg)"
                        />
                        <input
                            type="number"
                            placeholder="Profundidad (cm)"
                            value={dimensions.depth}
                            onChange={(e) => setDimensions({ ...dimensions, depth: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="number"
                            placeholder="Ancho (cm)"
                            value={dimensions.width}
                            onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                        <input
                            type="number"
                            placeholder="Alto (cm)"
                            value={dimensions.height}
                            onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>
                </div>

                {/* Fotos */}
                <div className="mb-4">
                    <label className="block text-gray-700">Fotos</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageUpload}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                    />
                    <div className="flex space-x-4 mt-2">
                        {/* Aquí podrías mostrar las imágenes cargadas */}
                        {images.map((img, index) => (
                            <div key={index} className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                                <span className="text-gray-500">Imagen {index + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Precio promocional */}
                <div className="mb-4">
                    <label className="block text-gray-700">Precio promocional (opcional)</label>
                    <input
                        type="number"
                        value={promoPrice}
                        onChange={(e) => setPromoPrice(e.target.value)}
                        className="mt-1 w-full border border-gray-300 rounded-md p-2"
                        placeholder="$ 14000"
                    />
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => console.log('Cancelar')}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-green-600"
                    >
                        Agregar producto
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductPage;
