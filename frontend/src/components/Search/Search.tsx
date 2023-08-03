import React, { useState } from "react";

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

export const Search: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Audiobooks"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
