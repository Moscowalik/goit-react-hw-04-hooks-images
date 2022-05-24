import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.css';

export default function Searchbar ({onSubmit}) {
  const[searchQuery, setSearchQuery] = useState('')


function  handleNameChange (event) {
  setSearchQuery(event.currentTarget.value.toLowerCase() );
  };

function  handleSubmit (event)  {
    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Enter a request.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
  }

