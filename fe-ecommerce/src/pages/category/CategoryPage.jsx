import React from 'react'
import { Container } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CustomCard from '../../component/card/CustomCard'

const CategoryPage = () => {
  const { allProduct } = useSelector((state) => state.productInfo)
  const { slug } = useParams()
  const {allCategory} = useSelector((state)=> state.categoryInfo)
  // Match slug with parentCategory (convert spaces → hyphens)
  const specificCategoryProduct = allProduct.filter(
    (product) =>
      product.parentCategory?.toLowerCase().replace(/\s+/g, "-") === slug
  )

  return (
    <div>
      <div className="m-2 mt-3 p-2 rounded" style={{ background: "#52c1f559", width: "150px" }}>
        <Link to="/">
          <FaArrowLeft /> Back to home
        </Link>
      </div>

      <Container>
        <h3>{specificCategoryProduct[0]?.parentCategory}</h3>

        {specificCategoryProduct.length > 0 ? (
          <div className="d-flex mt-4 flex-wrap gap-4">
            {specificCategoryProduct.map((product) => (
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
        ) : (
          <p className="mt-4">No products found in this category.</p>
        )}
      </Container>
    </div>
  )
}

export default CategoryPage
