import React, { useState } from "react";
import { Navigate } from "react-router-dom";

interface SearchComponentProps {
  onSearch: (searchTerm: string) => void;
}

export const Search: React.FC<SearchComponentProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSearch = () => {
    const cleanedUpSearchTerm = searchTerm.replace(/\s+/g, "-");
    onSearch(cleanedUpSearchTerm);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={`/${searchTerm}`} replace={true} />;
  }
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
