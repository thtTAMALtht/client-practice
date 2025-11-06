import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import ProductDetails from "../components/ProductDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement : <p>loading.........</p>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/allProducts',
        Component: AllProducts,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/productDetails/:id',
        element : <ProductDetails></ProductDetails>,
        loader : ({params})=>fetch(`http://localhost:5000/products/${params.id}`)
      },
      {
        path: '/myPorducts',
        element : <MyProducts></MyProducts>
      },
      {
        path: '/myBids',
        element : <MyBids></MyBids>
      },
    ],
  },
]);

export default router;
