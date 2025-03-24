import { useDispatch, useSelector } from "react-redux";
import { asyncAddCart } from "../../redux/slice/cartSlice";
import { asyncToggleWishlist } from "../../redux/slice/wishlistSlice";
import { Link } from "react-router-dom";

import wishlistBanner from "../../assets/img/banner/wishlistBanner-1920.webp";
import Banner from "../../components/front/Banner";

function WishlistPage(){
  const products = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishlist.list);
  const wishlistQty = useSelector((state) => state.wishlist.qty);
  const wishlistTrueIds = Object.keys(wishlist).filter((key) => wishlist[key]);
  const wishlistData = products.filter((product) => wishlistTrueIds.includes(product.id));

  const dispatch = useDispatch();

  const { actionLoading } = useSelector((state) => state.loading);

  return (
    <>
      <Banner imageUrl={wishlistBanner} />
      <div className="container py-10 text-center">
        <div className="mb-5">
          <h2>Wishlist</h2>
          <span>{wishlistQty} {wishlistQty > 0 ? "items" : "item"}</span>
        </div>
        {
          wishlistQty > 0 ? (
            <ul className="list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-4">
              {
                wishlistData.map((item) => (
                  <li key={item.id} className="mb-7 position-relative">
                    <button
                      type="button"
                      className="btn btn-dark rounded-circle position-absolute top-0 end-0 me-4 mt-1 z-1"
                      onClick={() => dispatch(asyncToggleWishlist(item.id))}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <Link to={`/products/${item.id}`}>
                      <img
                        src={item.imageUrl}
                        className="w-100"
                        alt={item.title}
                      />
                      <div className="text-center">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">
                          £{item.price}
                          {
                            item.price !== item.origin_price && (
                              <>
                                / <del className="text-secondary">
                                  {item.origin_price}
                                </del>
                              </>
                            )
                          }
                        </p>
                      </div>
                    </Link>
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-primary-light w-100 mt-auto rounded-pill"
                        onClick={() =>
                          dispatch(asyncAddCart({ productId: item.id, qty: 1 }))
                        }
                        disabled={actionLoading}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </li>
                ))
              }
              
            </ul>
          ) : (
            <>
              <p className="fs-5">Your wishlist is empty.</p>
              <Link to='/products' className="btn btn-primary-light rounded-pill w-100 w-md-50 mt-10">CONTINUE SHOPPING</Link>
            </>
          )
        }
        
        
      </div>
    </>
  )
}

export default WishlistPage