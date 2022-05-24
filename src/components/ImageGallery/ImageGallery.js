import { useEffect, useState } from 'react';
import fetchImages from 'servicer/APIsettings';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Notification } from 'react-pnotify';

import './ImageGallery.css';

const Status = {
  IDLE: 'idle', //  простой, стоит и ничего не делает
  PENDING: 'pending', // ожидается выполнение
  RESOLVED: 'resolved', // выполнилось с результатом хорошо
  REJECTED: 'rejected', // отклонено
};

export default function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [searchPoint, setSearchPoint] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  // const [showModal, setShowModal] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [lastPage, setLastPage] = useState(1);

  const loadImages = (searchImgName, page) => {
    setLoading(true);
    setLastPage(page);

    fetchImages(searchImgName, page)
      .then(({ hits, total }) => {
        if (!total) {
          const newError = new Error(
            `There is no picture with ${searchImgName} name, please enter another request`
          );

          setError(newError);
          setStatus(Status.REJECTED);
        } else {
          setImages(imgs => [...(imgs || []), ...hits]);
          setSearchPoint(total);
          setStatus(Status.RESOLVED);
        }

        if (page !== 1) {
          setTimeout(() => {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }, 0);
        }
      })
      .catch(newError => {
        setError(newError);
        setStatus(Status.REJECTED);
      });

    setLoading(false);
  };

  const onModalClose = () => {
    setShowModal(!showModal);
  };

  const onModalOpen = activeModalImg => {
    setActiveModalImg(activeModalImg);
    onModalClose();
  };

  const onBtnClick = () => {
    setLoading(true);
    loadImages(searchQuery, lastPage + 1);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setImages([]);
    setLoading(false);
    loadImages(searchQuery, 1);
  }, [searchQuery]);

  if (status === 'idle') {
    return <div className="IdleContainer">Enter your request</div>;
  }
  if (status === 'error') {
    return <Notification type="Error" title="Error" text={error} />;
  }
  if (status === 'resolved') {
    return (
      <>
        <ul className="ImageGallery">
          {images.map(gallerySearchQuery => (
            <ImageGalleryItem
              key={gallerySearchQuery.id}
              params={gallerySearchQuery}
              handleImageClick={onModalOpen}
            />
          ))}
        </ul>
        {loading && <Loader />}
        {searchPoint > 12 && <Button onClick={onBtnClick} />}
        {showModal && (
          <Modal largeImageUrl={activeModalImg} onModalClose={onModalClose} />
        )}
      </>
    );
  }
}
