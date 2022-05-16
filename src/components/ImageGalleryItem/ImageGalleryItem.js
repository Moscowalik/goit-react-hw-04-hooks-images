import { PureComponent } from 'react';
import './ImageGalleryItem.css';

export default class ImageGalleryItem extends PureComponent {
  render() {
    const { webformatURL, largeImageURL, tags } = this.props.params;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={() => this.props.handleImageClick(largeImageURL)}
        />
      </li>
    );
  }
}
