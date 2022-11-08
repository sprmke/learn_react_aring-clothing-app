import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  const categoryData = categoriesMap[category];

  useEffect(() => {
    if (categoryData) {
      setProducts(categoryData);
    }
  }, [category, categoryData]);

  let content = (
    <p className='no-content'>No products found for '{category}' category</p>
  );

  if (products.length > 0) {
    content = (
      <>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        <div className='category-container'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </>
    );
  }

  return content;
};

export default Category;
