import { Link } from "react-router-dom";
import CustomCard from "../../component/card/CustomCard";
import { useSelector } from "react-redux";
import { useState } from "react";

const TopSelling = () => {
  const { allProduct } = useSelector((state) => state.productInfo);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = allProduct.slice(startIndex, endIndex);

    return (
    <div className="mb-5 latestArrival">
      <div>
        <h3>Products</h3>
      </div>

      <div className="d-flex justify-content-center mt-4 flex-wrap gap-4">
        {currentProducts.map((product) => (
          <Link to={"/product/" + product._id} key={product._id}>
            <CustomCard
              img={product.imgUrl}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          </Link>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1
                ? "btn-dark"
                : "btn-outline-dark"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopSelling;




// import { Link } from "react-router-dom";
// import CustomCard from "../../component/card/CustomCard";
// import { useSelector } from "react-redux";

// const TopSelling = () => {
//   const { allProduct } = useSelector((state) => state.productInfo);

//   return (
//     <>
//       <div className="mb-5 latestArrival">
//         <div>
//           <h3>Products</h3>
//         </div>

//         <div className="d-flex justify-content-center mt-4 flex-wrap gap-4">
//           {allProduct.map((product) => (
//             <Link to={"/product/" + product._id} key={product._id}>
//               <CustomCard
                
//                 img={product.imgUrl}
//                 title={product.title}
//                 description={product.description}
//                 price={product.price}
//               />{" "}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default TopSelling;
