import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import CelebrityFullDetails from "./PersonDetails";

const SearchDetails = () => {
  const { id, category } = useParams();

  return (
    <>
      {category === "movie" ? (
        <MovieDetails movieId={id} mediaCategory="movie" />
      ) : category === "tv" ? (
        <MovieDetails movieId={id} mediaCategory="tv" />
      ) : (
        <CelebrityFullDetails actorId={id} />
      )}
    </>
  );
};

export default SearchDetails;
