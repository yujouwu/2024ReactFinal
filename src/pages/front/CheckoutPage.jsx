// 外部 node_modules 資源
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// 內部 src 資源
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import CheckboxRadio from "../../components/form/CheckboxRadio";
import EmptyBasket from "../../components/front/emptyBasket";
import { asyncGetCart } from "../../redux/slice/cartSlice";
import { asyncSetLoading } from "../../redux/slice/loadingSlice";
import { createAsyncToast } from "../../redux/slice/toastSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CheckoutPage() {
  const dispatch = useDispatch();
  const {basketQty, ...cart} = useSelector((state) => state.cart);

  const navigate = useNavigate();

  // React hook form
  const {
    register, // state
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    defaultValues: {
      category: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    const { message, ...user } = data;
    const userInfo = {
      data: {
        user,
        message,
      },
    };
    checkout(userInfo);
  });

  // 客戶購物 - 結帳
  const checkout = async (data) => {
    dispatch(asyncSetLoading(['globalLoading', true]));
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order`;
      const response = await axios.post(url, data);
      alert(response.data.message);
      navigate(`/checkout/${response.data.orderId}`);
      getOrder(response.data.orderId);
    } catch (error) {
      dispatch(createAsyncToast(error.response.data))
    } finally {
      dispatch(asyncSetLoading(['globalLoading', false]))
    }
  };

  // customer - get order
  const { orderId } = useParams();  
  const [orderData, setOrderData] = useState({});
  const [orderDataProducts, setOrderDataProducts] = useState([]);
  const getOrder = useCallback(
    async(orderId) => {
      dispatch(asyncSetLoading(['globalLoading', true]));
      try {
        const url = `${BASE_URL}/api/${API_PATH}/order/${orderId}`;
        const response = await axios.get(url);
        setOrderData(response.data.order);
        setOrderDataProducts(Object.values(response.data.order.products));
        dispatch(asyncGetCart())
      } catch (error) {
        dispatch(createAsyncToast(error.response.data))
      } finally {
        dispatch(asyncSetLoading(['globalLoading', false]));
      }
    }, [dispatch]) 

  // customer - payment
  const pay = async (orderId) => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/pay/${orderId}`;
      const response = await axios.post(url);
      alert(response.data.message);
      navigate(`/ordersummary/${orderId}`)
      getOrder(orderId);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(() => {
    dispatch(asyncGetCart())
  }, [dispatch]);

  useEffect(() => {
    if (orderId){
      getOrder(orderId);
    }
  }, [orderId, getOrder])
  return (
    <>
      {basketQty === 0 && !orderId ? (
        <EmptyBasket />
      ) : (
        !orderId && ( 
          // {/* order form */}
          <div className="container py-10">
            <p className="h4">Checkout</p>
            <div className="row">
              <div className="col-lg-9">
                <p className="h5">Add delivery information</p>
                <form onSubmit={onSubmit}>
                  <Input
                    register={register}
                    errors={errors}
                    id="name"
                    labelText="Name"
                    type="text"
                    rules={{
                      required: "Name is required",
                    }}
                  />
                  <Input
                    register={register}
                    errors={errors}
                    id="email"
                    labelText="Email"
                    type="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    }}
                  />
                  <Input
                    register={register}
                    errors={errors}
                    id="tel"
                    labelText="Phone Number"
                    type="tel"
                    rules={{
                      required: "Phone Number is required",
                      pattern: {
                        value: /^(0[2-8]\d{7}|09\d{8})$/,
                        message: "Invalid phone number format",
                      },
                    }}
                  />
                  <Input
                    register={register}
                    errors={errors}
                    id="address"
                    labelText="Address"
                    type="text"
                    rules={{
                      required: "Address is required",
                    }}
                  />
                  <Textarea
                    register={register}
                    errors={errors}
                    id="message"
                    labelText="Message"
                    rules={{}}
                  />
                  <CheckboxRadio
                    register={register}
                    errors={errors}
                    type="checkbox"
                    id="isCheckForm"
                    labelText="Check me out"
                    rules={{
                      required:
                        "Please check the box to agree to the Terms and Conditions.",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={cart.carts?.length < 1}
                  >
                    Submit Order
                  </button>
                </form>
              </div>
              <div className="col-lg-3">
                <div className="border mt-8 mt-lg-0">
                  <p className="fs-6 border-bottom p-3">
                    Summary{" "}
                    <span>
                      ({basketQty} {basketQty === 1 ? "item" : "items"})
                    </span>
                  </p>
                  <ul className="list-unstyled border-bottom px-3 mb-0">
                    {cart?.carts?.map((cartItem, index) => (
                      <li
                        key={cartItem.id}
                        className={`d-flex ${
                          index === cart.carts.length - 1 ? "" : "border-bottom"
                        } py-3 gap-3`}
                      >
                        <div className="w-25">
                          <img
                            src={cartItem.product.imageUrl}
                            alt={cartItem.product.title}
                            className="img-fluid"
                          />
                        </div>
                        <div className="w-75 d-flex flex-column">
                          <p>{cartItem.product.title}</p>
                          <div className="d-flex justify-content-between">
                            <p>Quantity：{cartItem.qty}</p>
                            <p>£{cartItem.final_total}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <p>
                        Subtotal{" "}
                        <span>
                          ({basketQty} {basketQty === 1 ? "item" : "items"})
                        </span>
                      </p>
                      <span>£{cart?.final_total}</span>
                    </div>
                    <p>Delivery fee</p>
                    <div className="border-top mt-3 pt-3">
                      <p className="h4 d-flex align-items-center justify-content-between">
                        Total <span>£{cart?.final_total}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {
        orderId && (
          <>
            <div className="container py-10">
              <h3>Order Summary</h3>
              <ul className="list-unstyled d-flex gap-10">
                <li>
                  <p>Order date</p>
                  <span>{new Date(orderData.create_at * 1000).toLocaleDateString()}</span>
                </li>
                <li>
                  <p>Order Number</p>
                  <span className="text-break">{orderData.id}</span>
                </li>
              </ul>
              <div className="row">
                <div className="col-lg-6">
                  <p>Ship to</p>
                  <ul className="list-unstyled border p-5">
                    <li className="row mb-3">
                      <p className="col-sm-3">Name</p>
                      <div className="col-sm-9">
                        <p>{orderData?.user?.name}</p>
                      </div>
                    </li>
                    <li className="row mb-3">
                      <p className="col-sm-3">Email</p>
                      <div className="col-sm-9">
                        <p>{orderData?.user?.email}</p>
                      </div>
                    </li>
                    <li className="row mb-3">
                      <p className="col-sm-3">Phone Number</p>
                      <div className="col-sm-9">
                        <p>{orderData?.user?.tel}</p>
                      </div>
                    </li>
                    <li className="row mb-3">
                      <p className="col-sm-3">Address</p>
                      <div className="col-sm-9">
                        <p>{orderData?.user?.address}</p>
                      </div>
                    </li>
                    <li className="row mb-3">
                      <p className="col-sm-3">Message</p>
                      <div className="col-sm-9">
                        <p>{orderData.message}</p>
                      </div>
                    </li>
                    <li className="row mb-3">
                      <p className="col-sm-3">Payment</p>
                      <div className="col-sm-9">
                        {
                          orderData.is_paid ? (
                            <p className="text-success">
                              Paid
                              <i className="bi bi-check-circle fs-5 ms-2"></i>
                            </p>
                          ) : (
                            <p className="text-danger">
                              Unpaid
                            </p>
                          )
                        }
                      </div>
                    </li>
                  </ul>
                  <button type="button" className="btn btn-primary-light w-100 mt-0 mt-lg-6" onClick={() => pay(orderData.id)}>Pay now</button>
                  {/* <button type="button" className={`btn btn-primary-light w-100 mt-0 mt-lg-6 ${orderData.is_paid ? "disabled" : ""}`} onClick={() => pay(orderData.id)}>{orderData.is_paid ? "Payment Completed" : "Pay now"}</button> */}
                </div>
                <div className="col-lg-6">
                  <div className="border-top border-top-lg-0 mt-6 pt-4 mt-lg-0 pt-lg-0">
                    <p>Items</p>
                    <div className="border">
                      <p className="fs-6 border-bottom p-3">Summary <span>
                          ({orderDataProducts.reduce((sum, item) => sum + item.qty, 0)}{' '}
                            {orderDataProducts.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'items'}
                          )
                        </span>
                      </p>
                      <ul className="list-unstyled border-bottom px-3 mb-0">
                        {
                          orderDataProducts.map((item, index) => (
                            <li key={item.id} className={`d-flex ${index === orderDataProducts.length - 1 ? '' : 'border-bottom'} py-3 gap-3`}>
                              <div className="w-25">
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.title}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="w-75 d-flex flex-column">
                                <p>{item.product.title}</p>
                                <div className="d-flex justify-content-between">
                                  <p>Quantity：{item.qty}</p>
                                  <p>£{item.final_total}</p>
                                </div>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                      <div className="p-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <p>
                            Subtotal <span>
                              ({orderDataProducts.reduce((sum, item) => sum + item.qty, 0)}{' '}
                                {orderDataProducts.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'items'}
                              )
                            </span>
                          </p>
                          <span>£{orderData.total}</span>
                        </div>
                        <p>Delivery fee</p>
                        <div className="border-top mt-3 pt-3">
                          <p className="h4 d-flex align-items-center justify-content-between">Total <span>£{orderData.total}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            
          </>
        )
      }
    </>
  );
}
export default CheckoutPage;
