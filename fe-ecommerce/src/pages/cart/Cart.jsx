import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  emptyCart,
  removeProductFromCart,
  setRecentOrder,
  incrementQuantity,
  decrementQuantity,
} from "../../features/cart/Cartslice.js";
import { postOrderApi } from "../../features/cart/cartApi.js";
import emptycartimg from "../../assets/empty-cart.jpg"
import { setMyOrder } from "../../features/order/orderSlice.js";

const Cart = () => {
  const { cart } = useSelector((state) => state.cartInfo);
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnProductRemove = (_id) => {
    if(confirm("Are you sure you want to remove?"))
    dispatch(removeProductFromCart(_id));
  };

  const handleOnOrder = async () => {
    if (confirm("Are you sure you want to order?")) {
      const orderArg = cart.map(
        ({ _id, title, image, slug, quantity, size, price}) => {
          return {
            productId: _id,
            productTitle: title,
            thumbnail: image,
            productSlug: slug,
            quantity,
            size,
            price
          };
        }
      );

      const pending = postOrderApi(orderArg);
      toast.promise(pending, { pending: "Please wait..." });

      const { status, message, payload } = await pending;
      dispatch(setRecentOrder(payload));
      dispatch(emptyCart());
      navigate("/user/order-history");
    }
  };

// Correct way: return the accumulated value in reduce
const GrandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);



  return (
    <Container>
      <h2 className="mt-5">My Cart List</h2>
      <hr />
      {
        cart.length == 0 && <div>
          <div className="d-flex justify-content-center">
            <img src={emptycartimg} alt="" />
          </div>
          <div className="d-flex justify-content-center">
           <Link to={"/"}>
           <Button variant="dark">Keep Browsing</Button>
           </Link>
          </div>
        </div>
      }

<div className="cart-content">
  {/* LEFT SIDE: Cart Items */}
  <div className="left">
    {cart.map((item) => (
      <Row key={item._id} className="bg-light border rounded p-3 mb-3 flex-wrap">
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
            <div className="d-flex align-items-center gap-2">
              <Button onClick={() => dispatch(decrementQuantity(item._id))} variant="light">-</Button>
              <span className="fs-5">{item.quantity}</span>
              <Button onClick={() => dispatch(incrementQuantity(item._id))} variant="light">+</Button>
            </div>

            <div
              className="text-danger mt-2 mt-md-0"
              style={{ cursor: "pointer" }}
              onClick={() => handleOnProductRemove(item._id)}
            >
              Remove
            </div>
          </div>
        </Col>
      </Row>
    ))}
  </div>

  {/* RIGHT SIDE: Order Summary */}
  {cart.length > 0 && (
    <div className="right">
      <div className="p-3 bg-light border rounded shadow">
        <h3>Order Summary</h3>
        <div className="text-end">
          <p>Sub Total: <span>${GrandTotal}</span></p>
          <p>Shipping fee: $0</p>
          <h5>Grand Total: ${GrandTotal}</h5>
        </div>
        <div className="text-end mt-3">
          {user?._id ? (
            <Button variant="dark" onClick={handleOnOrder}>Proceed to Order</Button>
          ) : (
            <Link to="/login" state={{ from: "/cart" }}>
              <Button variant="dark">Login to Order</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )}
</div>

    </Container>
  );
};

export default Cart;


