// 外部資源
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncGetCart } from "../../redux/slice/cartSlice";
import { setGlobalLoading } from "../../redux/slice/loadingSlice";
import { createAsyncToast } from "../../redux/slice/toastSlice";

// 內部資源

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrdersummaryPage(){
  const dispatch = useDispatch();

  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [orderDataProducts, setOrderDataProducts] = useState([]);


  const getOrder = useCallback(
    async(orderId) => {
      dispatch(setGlobalLoading(true))
      try {
        const url = `${BASE_URL}/api/${API_PATH}/order/${orderId}`;
        const response = await axios.get(url);
        setOrderData(response.data.order);
        setOrderDataProducts(Object.values(response.data.order.products));
        dispatch(asyncGetCart())
      } catch (error) {
        dispatch(createAsyncToast(error.response.data))
      } finally {
        dispatch(setGlobalLoading(false))
      }
    }, [dispatch]) 

  useEffect(() => {
    getOrder(orderId);
    
  }, [orderId, getOrder])

  return (
    <>
      {
        orderData === null ? '' : orderData.is_paid ? (
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
                      <p className="text-success">
                        Paid
                        <i className="bi bi-check-circle fs-5 ms-2"></i>
                      </p>
                    </div>
                  </li>
                </ul>
                <button type="button" className="btn btn-primary-light w-100 mt-0 mt-lg-6 disabled">Payment Completed</button>
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
            <div className="text-center mt-10">
              <Link to="/products" className="btn btn-primary-light rounded-pill w-100 w-lg-50">CONTINUE SHOPPING</Link>
            </div>
          </div>
        ) : (
          <div className="container py-10">
            <h2>Order unpaid</h2>
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
            <Link to={`/checkout/${orderId}`} className="btn btn-primary-light">GO BACK TO CONTINUE</Link>
          </div>
          
        )
      }
    </>
  )
}
export default OrdersummaryPage;