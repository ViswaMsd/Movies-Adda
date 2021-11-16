import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SingleItem from "../SingleComponent";
import CustomPagination from "../Pagination";

const Search = () => {
  const [category, setCategory] = useState("movie");
  const [inputData, setInputData] = useState("");
  const [query, setQuery] = useState("Surya_Chidurala");
  const [searchData, setSearchData] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setCategory(e.target.value);
    setQuery("Surya_Chidurala");
  };

  const changeQuery = (e) => {
    e.preventDefault();
    setQuery(inputData);
    setInputData("");
  };

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${category}?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    setSearchData(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [category, query, page]);

  let placeholderData =
    category === "movie"
      ? "Search movie..."
      : category === "tv"
      ? "Search TV Shows..."
      : "Search Celebrity...";

  return (
    <>
      <div className="search_container">
        <select onChange={handleChange}>
          <option value="movie">Movie</option>
          <option value="tv">TV Shows</option>
          <option value="person">Celebrity</option>
        </select>
        <form onSubmit={changeQuery} autoComplete="off" noValidate>
          <input
            type="text"
            id="myInput"
            placeholder={placeholderData}
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button type="submit">
            <FaSearch size="20" />
          </button>
        </form>
      </div>
      {searchData?.length > 0 ? (
        <>
          <div className="search_results">
            {searchData.map((data) => (
              <SingleItem
                data={data}
                key={data.id}
                SearchCategory={category}
                MediaType={category}
              />
            ))}
            {numOfPages > 1 && (
              <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
          </div>
        </>
      ) : (
        <div className="no_data">
          <h1>
            Search{" "}
            {category === "movie" ? (
              <b
                style={{
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "#4a5fd4",
                }}
              >
                movie
              </b>
            ) : category === "tv" ? (
              <b
                style={{
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "#4a5fd4",
                }}
              >
                tv series
              </b>
            ) : (
              <b
                style={{
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                  color: "#4a5fd4",
                }}
              >
                Celebrity
              </b>
            )}{" "}
            name to get Details
          </h1>
        </div>
      )}
    </>
  );
};

export default Search;
