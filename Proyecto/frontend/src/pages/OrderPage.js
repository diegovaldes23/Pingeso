import React from 'react';

function OrderPage() {
  return (
    <div className="p-5 font-sans">
      <div className="flex justify-center bg-white py-4 border-b-2 border-gray-300 mb-5">
        <a href="#helados" className="text-gray-800 font-bold uppercase px-5 py-2 text-lg hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Helados</a>
        <a href="#dulces" className="text-gray-800 font-bold uppercase px-5 py-2 text-lg hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Dulces</a>
        <a href="#donas" className="text-gray-800 font-bold uppercase px-5 py-2 text-lg hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Donas</a>
        <a href="#mas" className="text-gray-800 font-bold uppercase px-5 py-2 text-lg hover:text-red-600 border-b-2 border-transparent hover:border-red-600">Más</a>
      </div>

      <section id="helados" className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Helados</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <ProductCard name="Helado de chocolate" description="Exquisito helado de chocolate belga." price="$12.900" imgSrc="/images/brownies.png" />
          <ProductCard name="Helado de vainilla" description="Cremoso helado de vainilla" price="$11.500" imgSrc="/images/brownies.png" />
          <ProductCard name="Helado de fresa" description="Helado de fresa con trozos naturales." price="$10.900" imgSrc="/images/brownies.png" />
        </div>
      </section>

      <section id="dulces" className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dulces</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <ProductCard name="Caramelos frutales" description="Surtido de caramelos con sabor a frutas." price="$5.500" imgSrc="/images/brownies.png" />
          <ProductCard name="Chocolate" description="Delicioso chocolate oscuro." price="$6.200" imgSrc="/images/brownies.png" />
          <ProductCard name="Gomitas" description="Gomitas de sabores variados." price="$4.900" imgSrc="/images/brownies.png" />
        </div>
      </section>

      <section id="donas" className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Donas</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <ProductCard name="Dona de chocolate" description="Dona cubierta de chocolate." price="$3.500" imgSrc="/images/brownies.png" />
          <ProductCard name="Dona de vainilla" description="Dona con glaseado de vainilla." price="$3.200" imgSrc="/images/brownies.png" />
          <ProductCard name="Dona de fresa" description="Dona cubierta con glaseado de fresa." price="$3.000" imgSrc="/images/brownies.png" />
        </div>
      </section>

      <section id="mas" className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Más</h2>
        <div className="flex flex-wrap justify-center gap-5">
          <ProductCard name="Brownie" description="Brownie de chocolate con nueces." price="$4.500" imgSrc="/images/brownies.png" />
          <ProductCard name="Cupcake" description="Cupcake con frosting de vainilla." price="$3.800" imgSrc="/images/brownies.png" />
          <ProductCard name="Macarons" description="Macarons de varios sabores." price="$5.200" imgSrc="/images/brownies.png" />
        </div>
      </section>
    </div>
  );
}

function ProductCard({ name, description, price, imgSrc }) {
  return (
    <div className="w-48 rounded-lg bg-white p-4 border border-gray-300 shadow-sm text-center relative">
      <img src={imgSrc} alt={name} className="w-full h-auto rounded-md mb-2" />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-md font-bold text-gray-800 mb-3">{price}</p>
      <button className="bg-red-600 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center absolute bottom-4 right-4 hover:bg-red-700">+</button>
    </div>
  );
}

export default OrderPage;
