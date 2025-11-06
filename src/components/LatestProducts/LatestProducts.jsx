import React, { use } from 'react';
import LatestProductCard from '../LatestProductCard/LatestProductCard';

const LatestProducts = ({latestProductPromise}) => {
    const latestProduct = use(latestProductPromise)
    console.log('latest products info',latestProduct);
    return (
        <div>
            <h3 className='text-center'>Latest Product : {latestProduct.length}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    latestProduct.map(latest=> <LatestProductCard key={latest._id} latest={latest}></LatestProductCard>)
                }
            </div>
        </div>
    );
};

export default LatestProducts;