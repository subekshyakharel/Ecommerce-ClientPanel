import React from 'react';
import { useSelector } from 'react-redux';

const CategorySection = () => {
  const { allCategory } = useSelector((state) => state.categoryInfo);
  const {parentCategory} = useSelector((state)=> state.categoryInfo);


  return (
    <div className='mt-4 mb-4'>
      <div className='d-flex gap-3 flex-wrap'>
        {parentCategory.map((cat)=> (
          <div key={cat._id}>
            <img src={cat.image} alt={cat.parentCategory} className='rounded-circle mb-2' width={200} height={200} style={{objectFit:'cover'}}/>
            <p className='text-center'>{cat.parentCategory}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
