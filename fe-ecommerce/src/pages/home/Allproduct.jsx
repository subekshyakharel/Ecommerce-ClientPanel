import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomCard from "../../component/card/CustomCard";
import { FaArrowLeft } from "react-icons/fa";
import { Container } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const Allproduct = () => {
  const { allProduct } = useSelector((state) => state.productInfo);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate total pages
  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  // Slice products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div
        className="m-2 mt-3 p-2 rounded"
        style={{ background: "#52c1f559", width: "150px" }}
      >
        <Link to="/">
          <FaArrowLeft /> Back to home
        </Link>
      </div>

      <Container>
        <h3>All Products</h3>
        <div className="d-flex mt-4 flex-wrap gap-4">
          {currentProducts.map((product) => (
            <Link to={"/product/" + product.slug} key={product._id}>
              <CustomCard
                img={product.imgUrl}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            </Link>
          ))}
        </div>

        {/*mui pagination */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          mb={4}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Container>
    </div>
  );
};

export default Allproduct;
