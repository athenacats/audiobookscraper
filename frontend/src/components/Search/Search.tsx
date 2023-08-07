import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

export const Search: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const cleanedUpSearchTerm = searchTerm.replace(/\s+/g, "-");
    onSearch(cleanedUpSearchTerm);
    navigate(`/${cleanedUpSearchTerm}`);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Audiobooks"
      />
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
