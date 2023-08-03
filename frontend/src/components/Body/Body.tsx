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
      <ul>
        {audiobooks.map((audiobook, index) => (
          <li key={index}>{audiobook.title}</li>
        ))}
      </ul>
    </div>
  );
};
