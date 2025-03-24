import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import 'animate.css';

import logo from "../assets/img/Strawberry cake icons created by Mihimihi - Flaticon.png";

function Loading(){
  const { globalLoading } = useSelector((state) => state.loading) 
  return (
    <>
        {
          globalLoading &&
           (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                inset: 0,
                position: 'fixed',
                zIndex: 999,
              }}
            >
            <div className="d-flex flex-column align-items-center">
              <img src={logo} alt="logo" className="animate__animated animate__pulse animate__infinite" style={{width: "80px"}}/>
              <div className='d-flex align-items-center fs-4 fw-semibold'>
                <span>Loading</span>
                <ReactLoading type="bubbles" color="black" height="4rem" width="4rem" />
              </div>
            </div>
          </div>
          )
        }
    </>
  )
}
export default Loading