import axios from "axios";
import React, { useEffect, useState } from "react";

interface AudiobookList {
  title: string;
  link: string;
  img: string | undefined;
}

interface SearchResultsProps {
  searchTerm: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm }) => {
  const [audiobooks, setAudiobooks] = useState<AudiobookList[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/${searchTerm}`)
      .then((response) => {
        setAudiobooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching audiobooks: ", error);
      });
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        {audiobooks.map((audiobook) => (
          <li key={audiobook.title}>
            <img src={audiobook.img}></img>
            <a href={audiobook.link}>{audiobook.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
