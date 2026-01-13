import React from 'react';
import { useSelector } from 'react-redux';

const CategorySection = () => {
  const { allCategory } = useSelector((state) => state.categoryInfo);
  const {parentCategory} = useSelector((state)=> state.categoryInfo);


  return (
    <div className="mt-4 mb-4">
  <div className="d-flex gap-3 flex-wrap">
    {parentCategory.map((cat) => (
      <div key={cat._id} className="category-item">
        <div className="category-img-wrapper">
          <img
            src={cat.image}
            alt={cat.parentCategory}
            className="category-img"
          />
        </div>
        <p className="text-center mt-2">{cat.parentCategory}</p>
      </div>
    ))}
  </div>
</div>

  );
};

export default CategorySection;
