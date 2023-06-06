import css from './ImageGalleryItem.module.css';

const Image = ({ description, smallImage, largeImage, openModal  }) => {
    return (
    <>
    <li className={css.ImageGalleryItem}  onClick={openModal}>
      <img className={css.ImageGalleryItemImage} src={smallImage} alt={description} data-large={largeImage} />
    </li>
    </>
 
)}

export default Image;