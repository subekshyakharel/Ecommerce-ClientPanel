import React, { useEffect, useState } from "react";
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleProductAction } from "../../features/product/productAction";
import { toast } from "react-toastify";
import { setCart } from "../../features/cart/Cartslice";
import { AiOutlineHeart } from 'react-icons/ai'
import { removeProductFromWishlist, setWishlist } from "../../features/wishlist/wishlistSlice";
import { AiTwotoneHeart } from 'react-icons/ai'
import { BsFillHeartFill } from 'react-icons/bs'

const ProductLandingPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { selectedProduct } = useSelector((state) => state.productInfo);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showUrl, setShowUrl] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const {user}= useSelector((state)=>state.userInfo)
  const {wishlist} = useSelector((state)=> state.wishlistInfo)

  useEffect(() => {
    const fetchProduct = async () => {
      setShowSpinner(true);
      await dispatch(fetchSingleProductAction(slug));
      setShowSpinner(false);
    };
    fetchProduct();
  }, [dispatch, slug]);

  const handleOnSize = (e) => {
    setSelectedSize(e.target.value);
  };


  const handleOnCart = ()=>{
    if(!selectedSize){
      toast.error("Please select a size first");
      return
    }
    const cartItem = {
      _id: selectedProduct._id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      image: selectedProduct.imgUrl,
      slug: slug,
      // ...selectedProduct,
      size: selectedSize,
      quantity: quantity,
    }

    
    dispatch(setCart(cartItem))
    toast("Product is added in cart");
    
  }

    const isInWishlist = wishlist.some(item => item._id === selectedProduct._id);
  const handleOnFav = ()=>{
    if(isInWishlist){
      dispatch(removeProductFromWishlist(selectedProduct._id))
    } else {
 const favItem = {
      _id: selectedProduct._id,
      title: selectedProduct.title,
      price: selectedProduct.price,
      image: selectedProduct.imgUrl,
      slug: slug,
      // ...selectedProduct,
      size: selectedSize,
      quantity: quantity,
    }
    dispatch(setWishlist(favItem))
    toast("Product is added in wishlist.")
    }
   
  }




  const handleOnPlus = ()=>{
    setQuantity(quantity+1)
  }

  const handleOnMinus = ()=>{
    setQuantity(quantity>1 ?quantity-1 :quantity )
  }

  return (
    <div>
      <Container>
        {/* spinner  */}
        {showSpinner && (
          <Row>
            <Col className="d-flex justify-content-center m-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        )}

        <Row className="my-3">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: "/all-products" }}
              >
                All Product
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{selectedProduct.title}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        {!selectedProduct?._id && (
          <Row>
            <Col className="d-flex justify-content-center">
              <Alert variant="danger">
                This product is not available, please contact Admin!
              </Alert>
            </Col>
          </Row>
        )}

        {selectedProduct._id && (
          <>
            <Row className="gy-4">
              <Col md={7}>
                <div className="mb-2" style={{ height: "400px" }}>
                  <img
                    src={selectedProduct.imageList[showUrl]}
                    alt="product cover"
                    className="w-100 h-100 object-fit-contain img-fluid rounded"
                  />
                </div>

                <div className="d-flex overflow-auto gap-2 py-3">
                  {selectedProduct.imageList?.map((url, i) => (
                    <img
                      src={url}
                      key={url}
                      width="80"
                      className="img-thumbnail"
                      alt="product thumbnail"
                      onClick={() => setShowUrl(i)}
                      style={{ cursor: "pointer" }}
                    />
                  ))}
                </div>
              </Col>

              <Col className="mt-5" md={5} xs={12}>
                <div className="d-flex h-100 flex-column justify-content-between">
                  <div className="top">
                    <h1 className="h3 mb-4">{selectedProduct.title}</h1>
                    <div className="mb-2 d-flex gap-2">
                      <h5> Description: </h5>
                      <p>{selectedProduct.description}</p>
                    </div>
                    <div className="size d-flex gap-3">
                      <h5 className="mt-1">Size: </h5>
                      {selectedProduct.size.map((size, i) => (
                        <Button
                          className={`px-3 border ${
                            selectedSize === size
                              ? "bg-dark text-white"
                              : "bg-light"
                          }`}
                          value={size}
                          onClick={handleOnSize}
                          variant="light"
                          key={i}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>

                    <div className="price mt-4 d-flex gap-3">
                      <h5 className="">Price: </h5>
                      <h5 style={{ color: "#706e6eff" }}>
                        ${selectedProduct.price}
                      </h5>
                    </div>

                    <div className="price mt-2 d-flex align-items-center gap-3">
                      <h5 className="mb-0 fw-semibold">Quantity:</h5>
                      <div className="d-flex align-items-center gap-2">
                        <Button className="px-3" onClick={handleOnMinus} variant="light">
                          -
                        </Button>
                        <span className="fs-3">{quantity}</span>
                        <Button className="px-3" onClick={handleOnPlus} variant="light">
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bottom">
                    <hr />
                    <div className="d-grid d-flex justify-content-center gap-3">
                      <Button
                        variant="dark"
                        disabled={selectedSize === ""}
                        onClick={handleOnCart}
                        className=""
                        style={{width:"400px"}}
                      >
                        {selectedSize === "" ? "Select Size" : "Add to cart"}
                      </Button>
                      <div onClick={handleOnFav}>
                        {
                          isInWishlist ? <BsFillHeartFill size={30}/> :<AiOutlineHeart size={30}/>
                          
                        }
                      
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductLandingPage;
