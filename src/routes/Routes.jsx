import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../components/Home/Home";
import AllProducts from "../components/AllProducts/AllProducts";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import MyProducts from "../components/MyProducts/MyProducts";
import MyBids from "../components/MyBids/MyBids";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import PrivateRoutes from "./PrivateRoutes";
import CreateProduct from "../components/CreateProduct/CreateProduct";

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
        path: '/createProduct',
        element : <PrivateRoutes><CreateProduct></CreateProduct></PrivateRoutes>
      },
      {
        path: '/productDetails/:id',
        element : <PrivateRoutes><ProductDetails></ProductDetails></PrivateRoutes>,
        loader : ({params})=>fetch(`http://localhost:5000/products/${params.id}`)
      },
  
      {
        path: '/myBids',
        element : <PrivateRoutes><MyBids></MyBids></PrivateRoutes>
      },
    ],
  },
]);

export default router;
