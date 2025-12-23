import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CustomCard from '../../component/card/CustomCard'
import { FaArrowLeft } from "react-icons/fa";
import { Container } from 'react-bootstrap';

const Allproduct = () => {
    const {allProduct} = useSelector((state)=> state.productInfo)
  return (
    <div>
       
        <div className='m-2 mt-3 p-2 rounded' style={{background: "#52c1f559", width:"150px"}}>
            <Link to="/">
            <FaArrowLeft />{" "}
            Back to home
            </Link>
        </div>
 <Container>
    <h3>All Product</h3>
           <div className="d-flex mt-4 flex-wrap gap-4">
          {allProduct.map((product) => (
            <Link to={"/product/" + product.slug} key={product._id}>
              <CustomCard
                
                img={product.imgUrl}
                title={product.title}
                description={product.description}
                price={product.price}
              />{" "}
            </Link>
          ))}
        </div>
        </Container>
    </div>
  )
}

export default Allproduct