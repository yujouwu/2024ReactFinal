import { useSelector } from "react-redux"


function Toast(){
  const toasts = useSelector((state) => state.toast)
  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="container position-relative">
        <div className="toast-container end-0 p-3" style={{top: '60px'}}>
          {
            toasts.map((toast) => (
              <div key={toast.id} className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header text-white ${
                  toast.success ? "bg-success" : "bg-danger"
                }`}>
                  <strong className="me-auto">{toast.title}</strong>
                  <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                  {toast.message}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default Toast