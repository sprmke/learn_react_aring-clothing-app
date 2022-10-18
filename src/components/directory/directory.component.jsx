import CategoryItem from '../../components/category-item/category-item.component';
import './directory.styles.scss';

const Directory = ({ categories }) => {
  return (
    <div className='directory-container'>
      {categories.map(({ id, title, imageUrl }) => (
        <CategoryItem id={id} title={title} imageUrl={imageUrl} key={id} />
      ))}
    </div>
  );
};

export default Directory;
