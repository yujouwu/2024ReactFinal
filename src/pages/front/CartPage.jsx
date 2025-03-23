// 外部 node_modules 資源
import { Link } from "react-router-dom";
import axios from "axios";

// 內部 src 資源
// import { CartContext } from "../../contexts/cartContext";
import EmptyBasket from "../../components/front/emptyBasket";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetCart } from "../../redux/slice/cartSlice";
import { createAsyncToast } from "../../redux/slice/toastSlice";
import { setGlobalLoading } from "../../redux/slice/loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CartPage(){
  const dispatch = useDispatch();
  const {basketQty, ...cart} = useSelector((state) => state.cart);
  console.log('basketQty')
  // 更新商品數量
  const updateCart = async(cartId, productId, qty) => {
    dispatch(setGlobalLoading(true))
    try {
      qty = Number(qty);
      if (isNaN(qty) || qty < 1) qty = 1;
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": qty
        }
      }
      await axios.put(url, data);
      dispatch(asyncGetCart());
    } catch (error) {
      dispatch(createAsyncToast(error.response.data))
    } finally{
      dispatch(setGlobalLoading(false))
    }
  }

  // 刪除購物車 (全部)
  const deleteCartAll = async() => {
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/carts`;
      await axios.delete(url);
      dispatch(asyncGetCart());
    } catch (error) {
      dispatch(createAsyncToast(error.response.data))
    } finally{
      dispatch(setGlobalLoading(false))
    }
  }

  // 刪除購物車 (單一)
  const deleteCartOne = async(cartId) => {
    dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      await axios.delete(url);
      dispatch(asyncGetCart());
    } catch (error) {
      dispatch(createAsyncToast(error.response.data))
    } finally{
      dispatch(setGlobalLoading(false))
    }
  }

  return (
    <>
      <div className="container py-10">       
        {/* cart */}
        {
          cart?.carts?.length > 0 ? (
            <div className="row">
              <div className="col-lg-9">
                <div className="d-flex align-items-center gap-3 border-bottom py-3">
                  <p className="h4 mb-0">
                    Basket <span>({basketQty} {basketQty === 1 ? 'item' : 'items'})</span>
                    
                  </p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={deleteCartAll}
                    >
                      清空購物車
                    </button>
                  </div>
                </div>
                {cart?.carts?.map((cartItem) => (
                  <div key={cartItem.id} className="d-flex border-bottom py-3 gap-3">
                    <div className="w-25">
                      <img
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="w-75 d-flex flex-column">
                      <div className="d-flex flex-column flex-lg-row flex--wrap align-items-start align-items-lg-center">
                        <div className="flex-fill">
                          <p className="mb-0">{cartItem.product.title}</p>
                        </div>
                        <div className="order-lg-1 w-15 text-lg-end">
                          <p className="mb-0">£{cartItem.final_total}</p>
                        </div>
                        <div>
                          <div className="d-flex align-items-center flex-wrap">
                            <span>數量：</span>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn border rounded-circle"
                                aria-label="Decrease quantity"
                                disabled={cartItem.qty === 1}
                                onClick={() =>
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    cartItem.qty - 1
                                  )
                                }
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              <input
                                type="number"
                                value={cartItem.qty}
                                className="text-center border-0 border-bottom"
                                min="1"
                                max="999"
                                onChange={(e) => {
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    e.target.value
                                  );
                                }}
                              />
                              <button
                                type="button"
                                className="btn border rounded-circle"
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    Math.min(10, cartItem.qty + 1)
                                  )
                                }
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                      <div className="mt-auto">
                          <button
                            type="button"
                            className="btn border-0 ps-0"
                            onClick={() => deleteCartOne(cartItem.id)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            <span>Remove</span>
                          </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-3">
                <p className="h4 py-3">Order Summary</p>
                <div className="border p-3">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                        Subtotal <span>({basketQty} {basketQty === 1 ? 'item' : 'items'})</span>
                      </p>
                      <span>£{cart?.final_total}</span>
                    </div>
                    <p>Delivery fee</p>
                  </div>
                  <div className="border-top py-3">
                    <p className="h4 d-flex align-items-center justify-content-between">Total <span>£{cart?.final_total}</span></p>
                    <Link to='/checkout' className="btn btn-primary w-100 rounded-pill">Proceed to Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            cart?.carts?.length == 0 ? <EmptyBasket /> : ''
          )
        }
      </div>
      
    </>
  )
}
export default CartPage