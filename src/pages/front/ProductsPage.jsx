// 外部 node_modules 資源
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// 內部 src 資源
import Pagination from "../../components/Pagination";
import { asyncAddCart } from "../../redux/slice/cartSlice";
import { setGlobalLoading } from "../../redux/slice/loadingSlice";
import { createAsyncToast } from "../../redux/slice/toastSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsPage() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  // Pagination
  const [pagination, setPagination] = useState({});

  // 取得產品列表
  const getProducts = useCallback(
    async (page = 1) => {
      dispatch(setGlobalLoading(true))
      try {
        const response = await axios.get(
          `${BASE_URL}/api/${API_PATH}/products?page=${page}`
        );
        setProducts(response.data.products);
        setPagination(response.data.pagination)
      } catch (error) {
        dispatch(createAsyncToast(error.response.data))
      } finally{
        dispatch(setGlobalLoading(false))
      }
    }, [dispatch]) 
  
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      {/* product list */}
      <div className="container">
        <h1 className="text-center">All Products</h1>
        <div className="row row-cols-2 row-cols-lg-4 g-3 g-md-4 g-lg-5">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="d-flex flex-column align-items-center h-100">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    className="w-100"
                    alt={product.title}
                  />
                  <div className="text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      £{product.price} /{" "}
                      <del className="text-secondary">
                        {product.origin_price}
                      </del>
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-auto rounded-pill"
                  onClick={() => dispatch(asyncAddCart({productId: product.id, qty: 1}))}
                  // disabled={actionLoading}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <Pagination pagination={pagination} getProducts={getProducts}/>
        </div>
      </div>
    </>
  );
}
export default ProductsPage;