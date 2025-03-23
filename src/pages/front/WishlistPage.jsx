import { useDispatch, useSelector } from "react-redux";
import { asyncAddCart } from "../../redux/slice/cartSlice";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import { Link } from "react-router-dom";


function WishlistPage(){
  const products = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishlist.list);
  const wishlistTrueIds = Object.keys(wishlist).filter((key) => wishlist[key]);
  const wishlistData = products.filter((product) => wishlistTrueIds.includes(product.id));

  const dispatch = useDispatch();

  const { actionLoading } = useSelector((state) => state.loading);

  return (
    <>
      <div className="container">
        <h2 className="text-center">Wishlist</h2>
          <ul className="list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-4">
            {
              wishlistData.map((item) => (
                <li key={item.id} className="mb-7">
                  <Link to={`/products/${item.id}`} className="position-relative">
                    <button
                      type="button"
                      className="btn btn-dark rounded-circle position-absolute end-0 mt-2 me-2 z-1"
                      onClick={() => dispatch(toggleWishlist(item.id))}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                    <img
                      src={item.imageUrl}
                      className="w-100"
                      alt={item.title}
                    />
                    <div className="text-center">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        £{item.price} /{" "}
                        <del className="text-secondary">
                          {item.origin_price}
                        </del>
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
        
      </div>
    </>
  )
}

export default WishlistPage