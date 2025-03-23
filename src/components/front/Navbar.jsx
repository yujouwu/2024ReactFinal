import { NavLink, useLocation } from 'react-router-dom';

import logo from '../../assets/img/Strawberry cake icons created by Mihimihi - Flaticon.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncGetCart } from '../../redux/slice/cartSlice';

function Navbar(){
  const [scrolled, setScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const location = useLocation();

  const { basketQty } = useSelector((state) => state.cart);
  const wishlistQty = useSelector((state) => state.wishlist.qty);
  
  const dispatch = useDispatch();

  const routes = [
    {
      path: '/products',
      name: 'Products'
    },
    {
      path: '/about',
      name: 'About'
    },
    {
      path: '/stores',
      name: 'Stores'
    },
    {
      path: '/admin-login',
      name: 'Admin'
    },
  ]

  useEffect(() => {
    dispatch(asyncGetCart());
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      }else {
        setScrolled(false)
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])


  return (
    <>
      <nav className={`navbar navbar-expand-lg sticky-top w-100 z-3 ${(scrolled || isNavCollapsed) && "bg-primary-light"}`}>
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to='/'>
            <img src={logo} alt="strawberry cake icons" className="img-fluid me-1" width="30px" />
            Regis's
          </NavLink>
          <div className="order-lg-1 d-flex align-items-center gap-2">
            <NavLink to='/wishlist' className="position-relative p-1">
              <i className="bi bi-suit-heart"></i>
              {
                wishlistQty !== 0  && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlistQty}
                  </span>
                )
              }
            </NavLink>
            <NavLink to='/cart' className="position-relative p-1 me-3">
              <i className="bi bi-bag"></i>
              {
                basketQty !== 0  && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {basketQty}
                  </span>
                )
              }
            </NavLink>
          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                routes.map((route) => (
                  <li key={route.path} className="nav-item">
                    <NavLink className={({isActive}) => {
                      return `nav-link link-body-emphasis ${isActive ? 'fw-bold' : ''}`
                    }} aria-current="page" to={route.path}>{route.name}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar