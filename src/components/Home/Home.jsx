import React, { Suspense } from "react";
import LatestProducts from "../LatestProducts/LatestProducts";

const latestProductPromise = fetch(
  "http://localhost:5000/products/latest"
).then((res) => res.json());

const Home = () => {
  return (
    <div className="py-4">
      <Suspense fallback={<p>loading....</p>}>
        <LatestProducts
          latestProductPromise={latestProductPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
