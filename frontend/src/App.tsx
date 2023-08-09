import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Body } from "./components/Body/Body";
import { Header } from "./components/Header/Header";
import { SearchResults } from "./components/SearchResults/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />

        <Routes>
          <Route path="/api" element={<Body />} />
          <Route path="/api/:searchTerm" element={<SearchResults />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
