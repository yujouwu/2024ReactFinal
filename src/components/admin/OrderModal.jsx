import PropTypes from "prop-types";

function OrderModal({
  modalType,
  onCloseModal,
  tempOrder,
  onOrderModalAction,
  onModalInputChange
}){

  const tempOrderProducts = Object.values(tempOrder.products === undefined ? [] : tempOrder.products);
  
  return (
    <>
      <div
        id="orderModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="orderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div
              data-bs-theme="dark"
              className={`modal-header ${
                modalType === "delete" ? "text-bg-danger" : "text-bg-dark"
              }`}
            >
              <h1 className="modal-title fs-5" id="orderModalLabel">
                {
                  modalType === "edit"
                    ? "Edit Product"
                    : modalType === "delete" && "刪除產品"
                }
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onCloseModal()}
              ></button>
            </div>
            <div className="modal-body">
              {
                modalType === 'delete' ? (
                  <p className="h4 text-center">
                    確定要刪除
                    <span className="text-danger">{tempOrder.id}</span>嗎？
                  </p>
                ) : (
                  <>
                    <h3>Order Summary</h3>
                    <ul className="list-unstyled d-flex gap-10">
                      <li>
                        <p>Order date</p>
                        <span>{new Date(tempOrder.create_at * 1000).toLocaleDateString()}</span>
                      </li>
                      <li>
                        <p>Order Number</p>
                        <span>{tempOrder.id}</span>
                      </li>
                    </ul>
                    <div className="row">
                      <div className="col-6">
                        <p>Ship to</p>
                        <ul className="list-unstyled border p-5">
                          <li className="row mb-3">
                            <p className="col-sm-4">Name</p>
                            <div className="col-sm-8">
                              <p>{tempOrder?.user?.name}</p>
                            </div>
                          </li>
                          <li className="row mb-3">
                            <p className="col-sm-4">Email</p>
                            <div className="col-sm-8">
                              <p>{tempOrder?.user?.email}</p>
                            </div>
                          </li>
                          <li className="row mb-3">
                            <p className="col-sm-4">Phone Number</p>
                            <div className="col-sm-8">
                              <p>{tempOrder?.user?.tel}</p>
                            </div>
                          </li>
                          <li className="row mb-3">
                            <p className="col-sm-4">Address</p>
                            <div className="col-sm-8">
                              <p>{tempOrder?.user?.address}</p>
                            </div>
                          </li>
                          <li className="row mb-3">
                            <p className="col-sm-4">Message</p>
                            <div className="col-sm-8">
                              <p>{tempOrder?.message}</p>
                            </div>
                          </li>
                          <li className="row mb-3">
                            <p className="col-sm-4">Payment</p>
                            <div className="col-sm-8">
                              <p className={`${tempOrder?.is_paid ? "text-success" : "text-danger"}`}>{tempOrder?.is_paid ? "paid" : "unpaid"}</p>
                            </div>
                          </li>
                        </ul>
                        <span>Order status</span>
                        <select name="status" className="form-select" aria-label="Default select example" disabled={!tempOrder.is_paid} value={tempOrder.status} onChange={onModalInputChange}>
                          <option value="">Open this select menu</option>
                          <option value="unconfirmed">Unconfirmed </option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <p>Items</p>
                        <div className="border">
                          <p className="fs-6 border-bottom p-3">Summary <span>
                              ({tempOrderProducts.reduce((sum, item) => sum + item.qty, 0)}{' '}
                                {tempOrderProducts.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'items'}
                              )
                            </span>
                          </p>
                          <ul className="list-unstyled border-bottom px-3 mb-0">
                            {
                              tempOrderProducts.map((item, index) => (
                                <li key={item.id} className={`d-flex ${index === Object.values(tempOrder.products).length - 1 ? '' : 'border-bottom'} py-3 gap-3`}>
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
                                  ({tempOrderProducts.reduce((sum, item) => sum + item.qty, 0)}{' '}
                                    {tempOrderProducts.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'items'}
                                  )
                                </span>
                              </p>
                              <span>£{tempOrder.total}</span>
                            </div>
                            <p>Delivery fee</p>
                            <div className="border-top mt-3 pt-3">
                              <p className="h4 d-flex align-items-center justify-content-between">Total <span>£{tempOrder.total}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                  </>
                )
              }
              
            </div>
            <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => onCloseModal()}
            >
              取消
            </button>
            {
              modalType === "delete" ? (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={onOrderModalAction}
                >
                  刪除
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onOrderModalAction}
                >
                  確認
                </button>
              )
            }
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
OrderModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  tempOrder: PropTypes.object.isRequired,
  onOrderModalAction: PropTypes.func.isRequired,
  onModalInputChange: PropTypes.func.isRequired,
}
export default OrderModal