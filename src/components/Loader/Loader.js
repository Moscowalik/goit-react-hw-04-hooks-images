import React from 'react';
import './Loader.css';
import { ImSpinner } from 'react-icons/im';

export default function Loader({ pokemonName }) {
  return (
    <div className="loader-container">
      <ImSpinner size="50" className="icon-spin" />
      Loading...
    </div>
  );
}
