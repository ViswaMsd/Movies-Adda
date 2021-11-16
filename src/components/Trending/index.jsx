import axios from "axios";
import React, { useState, useEffect } from "react";
import CustomPagination from "../Pagination";
import SingleItem from "../SingleComponent/index";

const Trending = () => {
  const [category, setCategory] = useState("movie");
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${category}/day?api_key=887a6e58ff55501bcfdc69a8db52ba7f&page=${page}`
      )
      .then((res) => setMovieData(res.data))
      .catch((e) => console.log(e));
  }, [category, page]);

  return (
    <div className="trending_page">
      <div className="header">
        <h1>
          Trending{" "}
          {category === "person" ? (
            <>Persons</>
          ) : category === "tv" ? (
            <>Tv Shows</>
          ) : (
            <>Movies</>
          )}
        </h1>
        <select onChange={handleChange}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          <option value="person">Persons</option>
        </select>
      </div>
      <div className="main">
        {movieData?.results?.map((data) => (
          <SingleItem data={data} key={data.id} />
        ))}
        <CustomPagination
          setPage={setPage}
          numOfPages={movieData.total_pages}
        />
      </div>
    </div>
  );
};

export default Trending;
