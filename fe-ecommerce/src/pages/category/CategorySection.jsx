import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const { allCategory } = useSelector((state) => state.categoryInfo);
  const {parentCategory} = useSelector((state)=> state.categoryInfo);


  return (
    <div className="mt-4 mb-4">
  <div className="d-flex gap-3 flex-wrap">
    {parentCategory.map((cat) => (
      <div key={cat._id} className="category-item">
        <div className="category-img-wrapper">
          <Link to={`/category/${cat.parentCategory
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}>
          <img
            src={cat.image}
            alt={cat.parentCategory}
            className="category-img"
          />
          </Link>
        </div>
        <p className="text-center mt-2">{cat.parentCategory}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default CategorySection;
