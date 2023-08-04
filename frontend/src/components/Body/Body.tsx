import axios from "axios";
import React, { useEffect, useState } from "react";

interface AudiobookList {
  title: string;
  link: string;
  img: string | undefined;
}

export const Body = () => {
  const [audiobooks, setAudiobooks] = useState<AudiobookList[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((response) => {
        setAudiobooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching audiobooks: ", error);
      });
  }, []);
  return (
    <div>
      <h2 className="text-center">Welcome to the AudioBook Library!</h2>
      <ul className="list-group">
        {audiobooks.map((audiobook, index) => (
          <li key={index}>
            <img src={audiobook.img}></img>
            <h4>
              <a
                className="link-underline link-underline-opacity-0 text-decoration-none"
                href={audiobook.link}
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
