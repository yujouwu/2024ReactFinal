import axios from "axios";
import { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/slice/loadingSlice";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";
import OrderModal from "../../components/admin/OrderModal";
import { createAsyncToast } from "../../redux/slice/toastSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalData = {
  create_at: 0,
  id: "",
  is_paid: false,
  message: "",
  products: {},
  total: 0,
  user: {
    address: "",
    category: "",
    email: "",
    isCheckForm: false,
    name: "",
    tel: ""
  },
  num: 0
};


function AdminOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  // Modal 相關
  const orderModalRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState(defaultModalData);
  
  const openModal = (order, type) => {
    setModalType(type);
    setModalData({
      ...order,
      status: modalData.status,
    });

    orderModalRef.current.show();
  };

  const closeModal = () => {
    orderModalRef.current.hide();
  };

  // 處理 Modal 內通用的輸入欄位
  const handleModalInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const editOrder = async() => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/admin/order/${modalData.id}`;
      const data = {
        data: {
          ...modalData,
        }
      }
      const response = await axios.put(url, data);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }

  const deleteOrder = async() => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/admin/order/${modalData.id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  }

  const handleOrderModalAction = async () => {
    const actionMap = {
      edit: editOrder,
      delete: deleteOrder,
    };
  
    const action = actionMap[modalType];
    if (!action) {
      alert("unknown modalType");
      return;
    }
  
    const { success, message} = await action();
  
    if (success) {
      dispatch(createAsyncToast({success, message}))
      closeModal();
      getOrders();
    }else{
      dispatch(createAsyncToast({success, message}))
    }
  };

  // Pagination
  const [pagination, setPagination] = useState({});
  const getOrders = useCallback(
    async (page = 1) => {
      dispatch(setGlobalLoading(true));
      try {
        const url = `${BASE_URL}/api/${API_PATH}/admin/orders?page=${page}`;
        const response = await axios.get(url);
        setOrders(response.data.orders);
        setPagination(response.data.pagination);
      } catch (error) {
        alert(`取得訂單失敗: ${error.response.data.message}`);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    },
    [dispatch]
  );

  

  useEffect(() => {
    // 建立 Modal 實體
    orderModalRef.current = new Modal("#orderModal");
    getOrders();
  }, [getOrders]);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col">
            <h2>訂單列表</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Order Date</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">Customer account</th>
                  <th scope="col">Order Amount</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Paid Date</th>
                  <th scope="col">Message</th>
                  <th scope="col">Order Status</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{new Date(order.create_at * 1000).toLocaleDateString()}</td>
                    <td>{order.id}</td>
                    <td>{order.user.email}</td>
                    <td>£{order.total}</td>
                    <td>
                      {order.is_paid ? (
                        <span className="text-success">已付款</span>
                      ) : (
                        <span>未付款</span>
                      )}
                    </td>
                    <td>
                      {order.is_paid ? (
                        // <span>{order.paid_date}</span>
                        <span>{new Date(order.paid_date * 1000).toLocaleString()}</span>
                      ) : (
                        <span>未付款</span>
                      )}
                    </td>
                    <td>{order.message}</td>
                    <td>{order.status}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-info"
                          onClick={() => openModal(order, "edit")}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => openModal(order, "delete")}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pagination={pagination} callApi={getOrders} />
        </div>
      </div>
      <OrderModal
        modalType={modalType}
        onCloseModal={closeModal}
        tempOrder={modalData}
        onOrderModalAction={handleOrderModalAction}
        onModalInputChange={handleModalInputChange}
      />
    </>
  );
}
export default AdminOrders;
