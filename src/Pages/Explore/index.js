import React from "react";
import { useEffect, useState } from "react";

const ExplorePage = () => {
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [category, setCategory] = useState("te");
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear());
  const [sortBy, setSortBy] = useState("release_date.desc");
  const [typeCategory, setTypeCategory] = useState("movie");
  return <div></div>;
};

export default ExplorePage;
