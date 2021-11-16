import React from "react";
import { Link } from "react-router-dom";
import { AiTwotoneFire } from "react-icons/ai";
import { MdMovieFilter, MdTv, MdExplore } from "react-icons/md";
import { ImSearch } from "react-icons/im";

const Layout = (props) => {
  return (
    <div className="app">
      <header>
        <h1 onClick={() => window.scroll(0, 0)}>Movie Maza</h1>
      </header>
      <main>{props.children}</main>
      <footer style={{ padding: "10px 0px" }}>
        <Link to="/trending">
          <AiTwotoneFire size="40" />
        </Link>
        <Link to="/new">
          <MdExplore size="40" />
        </Link>
        <Link to="/movies">
          <MdMovieFilter size="40" />
        </Link>
        <Link to="/tv-shows">
          <MdTv size="40" />
        </Link>
        <Link to="/search">
          <ImSearch size="40" />
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
