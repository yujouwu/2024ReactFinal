// 外部 node_modules 資源
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// 內部 src 資源
import Pagination from "../../components/Pagination";
import { asyncAddCart } from "../../redux/slice/cartSlice";
import { setGlobalLoading } from "../../redux/slice/loadingSlice";
import { createAsyncToast } from "../../redux/slice/toastSlice";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import productsBanner from "../../assets/img/banner/productsBanner-1920.webp";
import Banner from "../../components/front/Banner";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductsPage() {
  const dispatch = useDispatch();
  const { actionLoading } = useSelector((state) => state.loading);

  // Categories
  const categories = [
    "All",
    "cupcakes",
    "cakes",
    "vegan Cakes",
    "wedding Cakes",
    "preserves",
    "cookies",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 願望清單
  const wishlist = useSelector((state) => state.wishlist.list);

  const [products, setProducts] = useState([]);

  // Pagination
  const [pagination, setPagination] = useState({});

  // 取得產品列表
  const getProducts = useCallback(
    async (page = 1) => {
      dispatch(setGlobalLoading(true));
      try {
        const response = await axios.get(
          `${BASE_URL}/api/${API_PATH}/products?page=${page}&category=${selectedCategory === "All" ? "" : selectedCategory}`
        );
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        dispatch(createAsyncToast(error.response.data));
      } finally {
        dispatch(setGlobalLoading(false));
      }
    },
    [dispatch, selectedCategory]
  );

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <>
      <Banner imageUrl={productsBanner}/>
      <div className="container py-20">
        <h1 className="text-center">All Products</h1>
        {/* categories  */}
        <ul className="list-unstyled d-flex justify-content-center gap-6 flex-wrap">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                type="button"
                className={`btn rounded-0 text-black ${
                  (selectedCategory === category || (category === 'All' && selectedCategory === ''))
                    ? "btn-primary-light"
                    : "btn-outline-primary-light"
                }`}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
        {/* product list */}
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
                      £{product.price}
                      {
                        product.price !== product.origin_price && (
                          <>
                            / <del className="text-secondary">
                              {product.origin_price}
                            </del>
                          </>
                        )
                      }
                      
                    </p>
                  </div>
                </Link>
                <div className="d-flex w-100 gap-2">
                  <button
                    type="button"
                    className="btn btn-primary-light w-100 mt-auto rounded-pill"
                    onClick={() =>
                      dispatch(asyncAddCart({ productId: product.id, qty: 1 }))
                    }
                    disabled={actionLoading}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    className="btn bg-primary bg-opacity-10 rounded-circle border-0"
                    onClick={() => dispatch(toggleWishlist(product.id))}
                  >
                    <i
                      className={`bi text-primary-dark ${
                        wishlist[product.id]
                          ? "bi-suit-heart-fill"
                          : "bi-suit-heart"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <Pagination pagination={pagination} callApi={getProducts} />
        </div>
      </div>
    </>
  );
}
export default ProductsPage;
