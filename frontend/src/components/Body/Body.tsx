import axios from "axios";
import React, { useEffect, useState } from "react";

interface AudiobookList {
  title: string;
}

export const Body = () => {
  const [audiobooks, setAudiobooks] = useState<AudiobookList[]>([]);

  useEffect(() => {
    axios
      .get("/api/scrape")
      .then((response) => {
        setAudiobooks(response.data);
      })
      .catch((error) => {
        console.error("Error ftching audiobooks: ", error);
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
