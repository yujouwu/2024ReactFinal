// 外部資源
import { Outlet } from 'react-router-dom';

// 內部資源
import Navbar from '../components/front/Navbar';
import Footer from '../components/front/Footer';

function FrontendLayout () {

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