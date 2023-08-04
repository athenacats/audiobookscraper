import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AudiobookList {
  title: string;
  link: string;
  img: string | undefined;
}

export const SearchResults: React.FC = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>();
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
