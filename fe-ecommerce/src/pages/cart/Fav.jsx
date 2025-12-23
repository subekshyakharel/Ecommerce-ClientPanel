import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import { removeProductFromWishlist } from '../../features/wishlist/wishlistSlice';
import { setCart } from '../../features/cart/Cartslice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import wishlistimg from "../../assets/wishlist.png"

const Fav = () => {
  const {wishlist} = useSelector((state)=> state.wishlistInfo);
  const dispatch = useDispatch();

  const handleOnProductRemove=(_id)=>{
    dispatch(removeProductFromWishlist(_id));
  }

const handleOnCart = (item) => {
  const cartItem = {
    _id: item._id,
    title: item.title,
    price: item.price,
    image: item.image,
    slug: item.slug,
    size: item.size,
    quantity: item.quantity || 1,
  };

  dispatch(setCart(cartItem));
  dispatch(removeProductFromWishlist(item._id));
  toast("Product moved to cart");
};



  return (
    <>
    <div>
      <Container className='mt-4'>
      <h3>Wishlist</h3>
      <hr />
      <div>
      {
        wishlist.length == 0 && <div>
        <div className='d-flex justify-content-center allign-items-center'>
          <img src={wishlistimg} alt="" />
          </div>
<div className='d-flex justify-content-center mt-3'>
          <Link to={"/"}>
          <Button variant='dark'>Keep Browsing</Button>
             </Link>
             </div>
        </div>
      }
      </div>
      <div>
        {
          wishlist.map((item)=> {
            return   <Row key={item._id} className="bg-light border rounded p-3 mb-3 flex-wrap">
        <Col xs={12} md={4} sm={4} className="mb-3 mb-md-0 d-flex justify-content-center">
          <img src={item.image} className="cart-item-img" alt={item.title} />
        </Col>
        <Col xs={12} md={8} sm={8}>
          <h3>{item.title}</h3>
          <div className="d-flex justify-content-between">
            <h6>Size: <span>{item.size}</span></h6>
            <p>${item.price}</p>
          </div>

          <div className="d-flex justify-content-between mt-2">
            

            <div
              className="text-danger mt-2 mt-md-0"
              style={{ cursor: "pointer" }}
              onClick={() => handleOnProductRemove(item._id)}
            >
              Remove
            </div>
            <div onClick={()=>handleOnCart(item)} className="">
              <FaShoppingCart size={30}/>
            </div>
          </div>
        </Col>
      </Row>
          })
        }
      
      </div>
      </Container>
    </div>
    </>
  )
}

export default Fav