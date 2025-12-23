import Navbar from "react-bootstrap/Navbar";
import { Container, NavDropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { logoutUserApi } from "../../services/authapi";
import { setUser } from "../../features/user/userSlice";
import "./Header.css";
import { fetchAllCategoriesAction } from "../../features/category/categoryAction";

const Header = () => {
  const dispatch = useDispatch();
  const { allCategory } = useSelector((state) => state.categoryInfo);
  const { parentCategory } = useSelector((state) => state.categoryInfo);
  const { user } = useSelector((state) => state.userInfo);
  const { cart } = useSelector((state) => state.cartInfo);
  const [hoveredParent, setHoveredParent] = useState(null);
  const { wishlist } = useSelector((state) => state.wishlistInfo);

  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
  }, [dispatch]);

  const handleOnLogout = () => {
    logoutUserApi();

    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("refreshJWT");
    dispatch(setUser({}));
  };

  // Group categories by parent
  const groupedCategories = allCategory.reduce((acc, cat) => {
    const parent = cat.parentCategory || "Uncategorized";
    if (!acc[parent]) acc[parent] = [];
    acc[parent].push(cat);
    return acc;
  }, {});

  // Now make parent list (unique parents)
  const parentCategories = Object.keys(groupedCategories);

  return (
    <>
      <Navbar className="">
        <Container className="d-flex flex-column px-0">
          {/* Top section with logo, search, and icons */}
          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <h2>
                <Link className="nav-link fw-bold" to="/">
                  TrendAura
                </Link>
              </h2>
            </div>

            {/* Search Bar */}
            <div style={{ flexGrow: 1, maxWidth: "500px", margin: "0 20px" }}>
              <InputGroup>
                <Form.Control
                  placeholder="Search products"
                  aria-label="Search products"
                />
                <InputGroup.Text>Search</InputGroup.Text>
              </InputGroup>
            </div>

            {/* Icons */}
            <div>
              <ul className="d-flex gap-4 mb-0 list-unstyled">
                {/* <li>
                  <Link to="/" className="text-dark">
                    <IoMdHome size={20} />
                  </Link>
                </li> */}
                <li>
                  <Link to="/cart" className="text-dark">
                    <FaShoppingCart size={20} />
                    {cart.length > 0 && (
                      <div className="cart-count">
                        {" "}
                        <span>{cart.length}</span>
                      </div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/fav" className="text-dark">
                    <FaRegHeart size={20} />
                    {wishlist.length > 0 && (
                      <div className="cart-count">
                        {" "}
                        <span>{wishlist.length}</span>
                      </div>
                    )}
                  </Link>
                </li>

                {user?._id ? (
                  <>
                    <li>
                      <Link
                        to="/"
                        onClick={handleOnLogout}
                        className="text-dark"
                      >
                        <IoIosLogOut size={20} />
                      </Link>
                    </li>
                    <li>
                      <Link to="/user" className="text-dark">
                        <FaUser size={20} />
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login" className="text-dark">
                      <FaUser size={20} />
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Categories */}
      <div className=" nav-wrapper ">
        <Container className="categories d-flex gap-3 mt-3 px-3">
          <NavDropdown
            className="mb-2"
            title="Categories"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item>
              {" "}
              <Link to="/allProduct">All Products</Link>
            </NavDropdown.Item>

            {parentCategory.map((parent) => (
              <NavDropdown.Item className="">
                <Link
                  to={`/category/${parent.parentCategory
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {parent.parentCategory}
                </Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          {parentCategory.map((parent) => (
            <div
              key={parent.parentCategory}
              className="parent-category"
              onMouseEnter={() => setHoveredParent(parent.parentCategory)}
              onMouseLeave={() => setHoveredParent(null)}
            >
              <p className="mb-2">{parent.parentCategory}</p>

              {/* Sub categories */}
              {hoveredParent === parent.parentCategory && (
                <div className="subCatList d-flex justify-content-center flex-wrap gap-3">
                  {allCategory
                    .filter(
                      (cat) => cat.parentCategory === parent.parentCategory
                    )
                    .map((cat) => (
                      <div key={cat._id}>
                        <img
                          src={cat.image}
                          alt={cat.subCategory}
                          className="rounded-circle"
                          width="100"
                          height="100"
                        />
                        <p className="text-center">{cat.subCategory}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default Header;
