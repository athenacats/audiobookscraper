import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SearchResults.scss";

interface AudiobookList {
  title: string;
  link: string;
  img: string | undefined;
  id: string;
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
    <div className="body-container">
      <h2 className="text-center">Search Results</h2>
      <ul className="list-group">
        {audiobooks.map((audiobook) => (
          <li key={audiobook.id}>
            <img
              className="img-thumbnail "
              alt={audiobook.title}
              src={audiobook.img}
            ></img>
            <h4>
              <a
                className="link-underline link-underline-opacity-0 text-decoration-none"
                href={audiobook.link}
                target="_blank"
              >
                {audiobook.title}
              </a>
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
};
