import { Link } from "react-router-dom";
import CustomCard from "../../component/card/CustomCard";
import { useSelector } from "react-redux";

const LatestArrival = () => {
  const { allProduct } = useSelector((state) => state.productInfo);

  const latestArrival = [...allProduct].sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt) )

  return (
    <>
      <div className="mb-5 latestArrival">
        <div>
          <h3>Latest Arrival</h3>
        </div>

        <div className="d-flex justify-content-center mt-4 flex-wrap gap-4">
          {latestArrival.slice(0,4).map((product) => (
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

export default LatestArrival;
