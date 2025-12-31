import { Link } from "react-router-dom";
import CustomCard from "../../component/card/CustomCard";
import { useSelector } from "react-redux";

const TopSelling = () => {
  const { allProduct } = useSelector((state) => state.productInfo);

  return (
    <>
      <div className="mb-5 latestArrival">
        <div>
          <h3>Top Selling</h3>
        </div>

        <div className="d-flex justify-content-center mt-4 flex-wrap gap-4">
          {allProduct.map((product) => (
            <Link to={"/product/" + product._id} key={product._id}>
              <CustomCard
                
                img={product.imgUrl}
                title={product.title}
                description={product.description}
                price={product.price}
              />{" "}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopSelling;
