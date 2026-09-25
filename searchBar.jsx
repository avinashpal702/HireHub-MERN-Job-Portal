import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    navigate(`/jobs?title=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Search jobs..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="primary-button search-button">
        Search
      </button>
    </form>
  );
}