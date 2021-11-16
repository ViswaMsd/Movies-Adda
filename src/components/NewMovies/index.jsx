import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../Pagination/index";
import SingleItem from "../SingleComponent/index.jsx";

const NewMovies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [category, setCategory] = useState("te");
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [typeCategory, setTypeCategory] = useState("movie");

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/${typeCategory}?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-IN&year=${yearSelected}&sort_by=${sortBy}&page=${page}&with_original_language=${category}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [page, category, yearSelected, sortBy, typeCategory]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYearSelected(e.target.value);
  };
  const handleChangeSort = (e) => {
    setSortBy(e.target.value);
  };
  const handleChangeMediaType = (e) => {
    setTypeCategory(e.target.value);
  };
  let year = new Date().getFullYear();
  let years = [];
  for (let i = 0; i < 10; i++) {
    years.push(year);
    year--;
  }
  return (
    <div className="movie_page">
      <div className="header">
        <h1 className="pageTitle">Explore Movies & TV Shows</h1>
      </div>
      <div className="selection_category">
        <select onChange={handleChangeMediaType}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
        <select onChange={handleChange}>
          <option value="te">Telugu</option>
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="ml">Malayalam</option>
        </select>
        <select onChange={handleChangeSort}>
          <option value="popularity.desc">Popularity</option>
          <option value="release_date.desc">Release Date</option>
          <option value="vote_average.desc">Rating</option>
          <option value="original_title.asc">Title</option>
          <option value="vote_count.desc">Voting</option>
        </select>
        {typeCategory !== "tv" && (
          <select onChange={handleChangeYear}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="main">
        {content.length > 0 ? (
          content.map((data) => (
            <SingleItem data={data} key={data.id} MediaType={typeCategory} />
          ))
        ) : (
          <div className="no_data">
            <h1>No Data available</h1>
          </div>
        )}
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
};

export default NewMovies;
