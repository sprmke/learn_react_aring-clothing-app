import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import { CategoryContainer, Title, EmptyCategory } from './category.styles';

const Category = () => {
  const { category } = useParams();
  // console.log('render/re-rendering category component::');
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // console.log('effect fired calling setProducts::');
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  let content = (
    <EmptyCategory>No products found for '{category}' category</EmptyCategory>
  );

  if (products && products.length > 0) {
    content = (
      <>
        <Title>{category.toUpperCase()}</Title>
        <CategoryContainer>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainer>
      </>
    );
  }

  return content;
};

export default Category;
