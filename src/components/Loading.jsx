import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';

function Loading(){
  const { globalLoading } = useSelector((state) => state.loading) 
  return (
    <>
        {
          globalLoading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                inset: 0,
                position: 'fixed',
                zIndex: 999,
              }}
            >
            <ReactLoading type="spin" color="black" height="4rem" width="4rem" />
          </div>
          )
        }
    </>
  )
}
export default Loading