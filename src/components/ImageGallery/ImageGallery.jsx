import Image from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
    return (
    <>
    <ul className={css.ImageGallery}>
      {images.map(({ id, description, smallImage, largeImage }) => (
        <Image
          key={id}
          description={description}
          smallImage={smallImage}
          largeImage={largeImage}
          openModal={openModal }
        />
      ))}
    </ul>
    </>
 
)}

export default ImageGallery;