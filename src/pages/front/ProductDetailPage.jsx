// 外部 node_modules 資源
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// 內部 src 資源
import { useDispatch, useSelector } from "react-redux";
import { asyncAddCart } from "../../redux/slice/cartSlice";
import { setGlobalLoading } from "../../redux/slice/loadingSlice";
import { createAsyncToast } from "../../redux/slice/toastSlice";
import { asyncToggleWishlist } from "../../redux/slice/wishlistSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function ProductDetailPage(){
  const dispatch = useDispatch();
  const { actionLoading } = useSelector((state) => state.loading)
  const wishlist = useSelector((state) => state.wishlist.list);

  const [product, setProduct] = useState({});
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  const { id: productId } = useParams();
  
  // 取得單一產品資訊
  const getProduct = useCallback(
    async (productId) => {
      setIsLoadingProduct(true)
      dispatch(setGlobalLoading(true))
      try {
        const response = await axios.get(
          `${BASE_URL}/api/${API_PATH}/product/${productId}`
        );
        setProduct(response.data.product); 
      } catch (error) {
        dispatch(createAsyncToast(error.response.data))
      } finally{
        setIsLoadingProduct(false);
        dispatch(setGlobalLoading(false))
      }
    }, [dispatch]) 

  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl); // 當 product 更新後執行
    }
  }, [product]);

  useEffect(() => {
    getProduct(productId);
  }, [productId, getProduct])

  return (
    <>
      {
        !isLoadingProduct && (
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-3">
                  <img
                    src={mainImage || product.imageUrl}
                    className="card-img-top object-fit-contain"
                    alt="main image"
                  />
                </div>
                <div className="d-flex flex-wrap gap-3">
                  <img
                    className={`more-images ${
                      mainImage === product.imageUrl ? "active" : ""
                    }`}
                    src={product.imageUrl}
                    onClick={() => setMainImage(product.imageUrl)}
                  />
                  {product.imagesUrl?.map((url, index) => (
                    <img
                      className={`more-images ${
                        mainImage === url ? "active" : ""
                      }`}
                      key={index}
                      src={url}
                      alt="more image"
                      onClick={() => setMainImage(url)}
                    />
                  ))}
                </div>
              </div>
              <div className="col-lg-6 p-3 px-lg-4 ">
                <section>
                  <h1 className="fs-4 d-flex align-items-center">
                    {product.title}
                    <span className="badge text-bg-primary ms-2 fs-6">{product.category}</span>
                  </h1>
                  
                  <div>
                    <span className="fs-4 fw-bold me-2">
                      £{product.price}
                    </span>
                    {
                      product.price !== product.origin_price && (
                        <>
                          / <del className="text-secondary">
                            {product.origin_price}
                          </del>
                        </>
                      )
                    }
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn border rounded-circle"
                        aria-label="Decrease quantity"
                        disabled={selectedQuantity === 1}
                        onClick={() =>
                          setSelectedQuantity((prev) => Math.max(1, prev - 1))
                        }
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        value={selectedQuantity}
                        className="text-center border-0 border-bottom"
                        min="1"
                        max="10"
                        onChange={(e) => {
                          let num = Number(e.target.value);
                          if (isNaN(num)) num = 1; // 防止 NaN
                          num = Math.max(1, Math.min(10, num)); // 限制範圍在 1 到 10 之間
                          setSelectedQuantity(num);
                        }}
                      />
                      <button
                        type="button"
                        className="btn border rounded-circle"
                        aria-label="Increase quantity"
                        disabled={selectedQuantity === 10}
                        onClick={() =>
                          setSelectedQuantity((prev) => Math.min(10, prev + 1))
                        }
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary w-100 rounded-pill"
                      onClick={() => dispatch(asyncAddCart({productId: product.id, qty: selectedQuantity}))}
                      disabled={actionLoading}
                    >
                      Add to Bag
                    </button>
                    <button
                      type="button"
                      className="btn bg-primary bg-opacity-10 rounded-circle border-0"
                      // onClick={() => dispatch(toggleWishlist(product.id))}
                      onClick={() => dispatch(asyncToggleWishlist(product.id))}
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
                </section>
                <section>
                  <p className="">
                    商品描述：
                    <br />
                    {product.description}
                  </p>
                  <p className="">Allergens：{product.allergens}</p>
                  <p className="">Ingredient：{product.ingredients}</p>
                </section>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.nutritionalInfo?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> 
            </div>
          </div>
        ) 
      }
    </>
  )
}
export default ProductDetailPage