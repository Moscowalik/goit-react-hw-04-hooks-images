import './ImageGalleryItem.css';

export default function ImageGalleryItem ({params, handleImageClick}) {
  const { webformatURL, largeImageURL, tags } = params;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={() => handleImageClick(largeImageURL)}
        />
      </li>
    );
  }

