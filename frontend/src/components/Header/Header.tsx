import { useNavigate } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/`);
  };
  return (
    <div className="header-container">
      <h1 onClick={handleTitleClick}> Audiobook Scraper</h1>
    </div>
  );
};
