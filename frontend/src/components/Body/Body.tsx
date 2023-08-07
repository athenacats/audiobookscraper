import axios from "axios";
import { useEffect, useState } from "react";
import "./Body.scss";

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
    <div className="body-container">
      <h4 className="text-center ">
        Welcome to the <span className="bigger">AudioBook Library!</span>
      </h4>
      <ul className="list-group">
        {audiobooks.map((audiobook, index) => (
          <li key={index}>
            <img
              className="img-thumbnail "
              src={audiobook.img}
              alt={audiobook.title}
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
