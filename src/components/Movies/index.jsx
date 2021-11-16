import axios from "axios";
import { useEffect, useState } from "react";
import Genres from "../Genres/Genres.js";
import useGenre from "../../hooks/useGenre";
import CustomPagination from "../Pagination/index";
import SingleItem from "../SingleComponent/index.jsx";

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [genreforURL, page]);

  return (
    <div className="movie_page">
      <div className="header">
        <h1 className="pageTitle">Discover Movies</h1>
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </div>
      <div className="main">
        {content.length > 0 ? (
          content.map((data) => (
            <SingleItem data={data} key={data.id} MediaType="movie" />
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

export default Movies;
