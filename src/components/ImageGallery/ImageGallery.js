import React, { Component } from 'react';
import ApiService from 'servicer/APIsettings';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Notification } from 'react-pnotify';

import './ImageGallery.css';

const api = new ApiService();

export default class ImageGallery extends Component {
  state = {
    searchQuery: [],
    searchPoint: null,
    largeURL: '',
    status: 'idle',
    errorMessage: '',
    page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });
      api.resetPage();
      api.query = nextQuery;
      api.fetchData().then(nextQuery => {
        if (nextQuery.hits.length > 0) {
          this.setState({
            searchQuery: nextQuery.hits,
            searchPoint: nextQuery.total,
            status: 'resolved',
          });
        } else {
          this.setState({
            status: 'error',
            errorMessage: 'Nothing found!',
          });
        }
      });
    }
  }
  handleImageClick = value => {
    this.setState({
      largeURL: value,
      status: 'modal',
    });
  };
  onModalClose = () => {
    this.setState({
      status: 'resolved',
    });
  };

  handleClickMore = e => {
    api.incrementPage();
    api.fetchData().then(nextQuery => {
      this.setState(prev => ({
        searchQuery: [...prev.searchQuery, ...nextQuery.hits],
        status: 'resolved',
      }));
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  render() {
    const { searchQuery, status, searchPoint, largeURL, errorMessage } =
      this.state;
    if (status === 'idle') {
      return <div className="IdleContainer">Enter your request</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'error') {
      return <Notification type="Error" title="Error" text={errorMessage} />;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className="ImageGallery">
            {searchQuery.map(searchQuery => (
              <ImageGalleryItem
                key={searchQuery.id}
                params={searchQuery}
                handleImageClick={this.handleImageClick}
              />
            ))}
          </ul>
          {searchPoint > 12 && <Button onClick={this.handleClickMore} />}
        </>
      );
    }
    if (status === 'modal') {
      return (
        <Modal largeImageUrl={largeURL} onModalClose={this.onModalClose} />
      );
    }
  }
}
