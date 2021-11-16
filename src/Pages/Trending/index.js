import React, { useState, useEffect } from "react";
import axios from "axios";
import TrendingComponent from "../../AppComponents/TrendingComponents";
import { useDispatch } from "react-redux";
import { AddTrendingMedia } from "../../features/Trending";

const TrendingPage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("movie");
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${category}/day?api_key=887a6e58ff55501bcfdc69a8db52ba7f&page=${page}`
      )
      .then((res) => dispatch(AddTrendingMedia(res.data)))
      .catch((e) => console.log(e));
  }, [category, page, dispatch]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <React.Fragment>
      <TrendingComponent
        setPage={setPage}
        setCategory={setCategory}
        category={category}
        handleChange={handleChange}
      />
    </React.Fragment>
  );
};

export default TrendingPage;
