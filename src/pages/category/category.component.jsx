import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title, EmptyCategory } from './category.styles';

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
    <EmptyCategory>No products found for '{category}' category</EmptyCategory>
  );

  if (products.length > 0) {
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
