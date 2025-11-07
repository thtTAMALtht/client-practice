import React from 'react';
import useAllProducts from '../../hooks/useAllProducts';

const AllProducts = () => {
    const {products} = useAllProducts();
    console.log(products);
    return (
        <div>
            <h3 className='text-center py-6'>Product List</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    products.map(product=><div key={product._id} className="card bg-base-100 shadow-sm">
                        <figure className="px-10 pt-10">
                          <img
                            src={product.image}
                            alt="Shoes"
                            className="rounded-xl"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{product.title}</h2>
                          <p>
                            Price : {product.price_min} -{product.price_max}
                          </p>
                          
                        </div>
                      </div>)
                }
            </div>
        </div>
    );
};

export default AllProducts;