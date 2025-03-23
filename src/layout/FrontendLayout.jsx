// 外部資源
import { Outlet, useLocation } from 'react-router-dom';

// 內部資源
import Navbar from '../components/front/Navbar';
import Footer from '../components/front/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncGetProductsAll } from '../redux/slice/productsSlice';

function FrontendLayout () {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncGetProductsAll());    
  }, [dispatch])
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <>
        <Navbar /> 
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  )
}
export default FrontendLayout