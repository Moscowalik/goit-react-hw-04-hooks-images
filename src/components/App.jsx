import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  function handleFormSubmit(searchQuery) {
    setSearchQuery(searchQuery);
  }

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
