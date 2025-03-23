import { createHashRouter } from "react-router-dom";

import FrontendLayout from "../layout/FrontendLayout";
import HomePage from "../pages/front/HomePage";
import ProductsPage from "../pages/front/ProductsPage";
import AdminLoginPage from "../pages/front/AdminLoginPage";
import AboutPage from "../pages/front/AboutPage";
import CartPage from "../pages/front/CartPage";
import CheckoutPage from "../pages/front/CheckoutPage";
import ProductDetailPage from "../pages/front/ProductDetailPage";
import SuccessPage from "../pages/front/SuccessPage";
import AdminLayout from "../layout/AdminLayout";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCoupons from "../pages/admin/AdminCoupons";
import NotFoundPage from "../pages/front/NotFoundPage";
import WishlistPage from "../pages/front/WishlistPage";
import StoresPage from "../pages/front/StoresPage";

const routes = createHashRouter([
  {
    path: '/',
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'products/:id',
        element: <ProductDetailPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'stores',
        element: <StoresPage />
      },
      {
        path: 'wishlist',
        element: <WishlistPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      {
        path: 'checkout/:orderId',
        element: <CheckoutPage />
      },
      {
        path: 'success/:orderId',
        element: <SuccessPage />
      },
      {
        path: 'admin-login',
        element: <AdminLoginPage />
      },
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'products',
        element: <AdminProducts />
      },
      {
        path: 'orders',
        element: <AdminOrders />
      },
      {
        path: 'coupons',
        element: <AdminCoupons />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

export default routes;