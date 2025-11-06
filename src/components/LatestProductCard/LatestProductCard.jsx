import React from 'react';
import { Link } from 'react-router';

const LatestProductCard = ({latest}) => {
    const {_id, title, price_min, price_max, image } = latest;
    return (
      <div>
        <div className="card bg-base-100 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={image}
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>
              Price : {price_min} -{price_max}
            </p>
            <div className="card-actions">
              <Link to={`/productDetails/${latest._id}`} className="btn btn-primary w-full">View Details</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default LatestProductCard;