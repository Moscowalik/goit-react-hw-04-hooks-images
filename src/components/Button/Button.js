import './Button.css';

export default function Button({ onClick }) {
  return (
    <div className="Button-container">
      <button type="button" className="Button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
