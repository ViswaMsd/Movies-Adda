import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from "react-icons/fa";

const CelebrityFullDetails = ({ actorId }) => {
  const img_300 = "https://image.tmdb.org/t/p/w300";
  const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
  const noPicture =
    "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
  const [actorFullDetails, setActorFullDetails] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [actorCategory, setActorCategory] = useState("movie_credits");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US`
      )
      .then((res) => setActorFullDetails(res.data))
      .catch((err) => console.log(err));
    window.scroll(0, 0);
  }, [actorId, setActorFullDetails]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorId}/external_ids?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US`
      )
      .then((res) => setExternalLinks(res.data))
      .catch((err) => console.log(err));
  }, [actorId, setExternalLinks]);

  var dob = new Date(`${actorFullDetails.birthday}`);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  var age = Math.abs(year - 1970);

  var dod = new Date(`${actorFullDetails.deathday}`);
  var month_diff_dod = Date.now() - dod.getTime();
  var age_dt_dod = new Date(month_diff_dod);
  var year_od = age_dt_dod.getUTCFullYear();
  var age_od = Math.abs(year_od - 1970);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${actorId}/${actorCategory}?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US`
      )
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err));
  }, [actorId, setMovieList, actorCategory]);

  movieList?.cast?.sort((a, b) => {
    return b.release_date?.slice(0, 4) - a.release_date?.slice(0, 4);
  });
  movieList?.crew?.sort((a, b) => {
    return b.release_date?.slice(0, 4) - a.release_date?.slice(0, 4);
  });

  movieList?.cast?.sort((a, b) => {
    return b.first_air_date?.slice(0, 4) - a.first_air_date?.slice(0, 4);
  });
  movieList?.crew?.sort((a, b) => {
    return b.first_air_date?.slice(0, 4) - a.first_air_date?.slice(0, 4);
  });
  const changeCategory = (e) => {
    setActorCategory(e.target.value);
  };

  console.log(movieList);
  return (
    <>
      {actorFullDetails.name && (
        <div className="actor_full_details">
          <div className="left_section">
            {actorFullDetails.profile_path ? (
              <img
                src={`${img_300}${actorFullDetails.profile_path} `}
                alt={actorFullDetails.name}
              />
            ) : (
              <img src={unavailable} alt={actorFullDetails.name} />
            )}
            {externalLinks && (
              <div className="external_links">
                {externalLinks.facebook_id && (
                  <a
                    href={`https://www.facebook.com/${externalLinks.facebook_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebookSquare size="40" color="#4267B2" />
                  </a>
                )}
                {externalLinks.twitter_id && (
                  <a
                    href={`https://twitter.com/${externalLinks.twitter_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitterSquare size="40" color="#1DA1F2" />
                  </a>
                )}
                {externalLinks.instagram_id && (
                  <a
                    href={`https://instagram.com/${externalLinks.instagram_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram size="40" color="#8a3ab9" />
                  </a>
                )}
              </div>
            )}
            <h1>Personal Info</h1>
            {actorFullDetails.known_for_department && (
              <div className="details_item">
                <span>
                  <b>Known For</b>
                </span>
                <p>{actorFullDetails.known_for_department}</p>
              </div>
            )}
            {actorFullDetails.birthday && (
              <div className="details_item">
                <span>
                  <b>Birth Date</b>
                </span>
                <p>
                  {actorFullDetails.birthday}({age} years)
                </p>
              </div>
            )}
            {actorFullDetails.deathday && (
              <div className="details_item">
                <span>
                  <b>Death Date</b>
                </span>
                <p>
                  {actorFullDetails.deathday}({age_od} years)
                </p>
              </div>
            )}
            {actorFullDetails.place_of_birth && (
              <div className="details_item">
                <span>
                  <b>Place of Birth</b>
                </span>
                <p>{actorFullDetails.place_of_birth}</p>
              </div>
            )}
            {actorFullDetails.also_known_as?.length > 1 && (
              <div className="details_item">
                <span>
                  <b>Also Known As</b>
                </span>
                {actorFullDetails.also_known_as.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            )}
          </div>
          <div className="right_section">
            <h1>{actorFullDetails.name}</h1>
            {actorFullDetails.biography && (
              <div>
                <span>
                  <b>Biography</b>
                </span>
                <p>{actorFullDetails.biography}</p>
              </div>
            )}
            {movieList?.cast?.length > 0 && (
              <React.Fragment>
                <h4>Known for</h4>
                <div className="movie_list">
                  {movieList?.cast?.map((movie) => (
                    <div
                      className="movie"
                      key={movie.title ? movie.title : movie.original_name}
                      onClick={() =>
                        history.push(
                          `/search/${movie.id}/${
                            actorCategory === "movie_credits" ? "movie" : "tv"
                          }`
                        )
                      }
                    >
                      {movie.popularity > 1.3 && (
                        <>
                          {movie.poster_path ? (
                            <img
                              src={`${img_300}${movie.poster_path}`}
                              alt={
                                movie.title ? movie.title : movie.original_name
                              }
                            />
                          ) : (
                            <img
                              src={noPicture}
                              alt={
                                movie.title ? movie.title : movie.original_name
                              }
                            />
                          )}
                          <p>
                            {movie.title ? movie.title : movie.original_name}
                          </p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
            {actorCategory === "tv_credits" && movieList?.cast?.length === 0 && (
              <>
                <div className="acting_area">
                  <h4>Acting({movieList?.cast?.length})</h4>
                  <select onChange={changeCategory}>
                    <option value="tv_credits">TV Shows</option>
                    <option value="movie_credits">Movies</option>
                  </select>
                </div>
                <div className="no_data_available">
                  <p>No data available this TV category</p>
                </div>
              </>
            )}

            {movieList?.cast?.length > 0 && (
              <React.Fragment>
                <div className="acting_area">
                  <h4>Acting({movieList?.cast?.length})</h4>
                  <select onChange={changeCategory}>
                    <option value="movie_credits">Movies</option>
                    <option value="tv_credits">TV Shows</option>
                  </select>
                </div>
                <div className="movie_details">
                  {movieList?.cast?.map((details) => (
                    <div
                      className="each_cinema_details"
                      key={details.id}
                      onClick={() =>
                        history.push(
                          `/search/${details.id}/${
                            actorCategory === "movie_credits" ? "movie" : "tv"
                          }`
                        )
                      }
                    >
                      <div className="year">
                        {details.release_date
                          ? details.release_date?.slice(0, 4)
                          : details.first_air_date?.slice(0, 4)}
                      </div>
                      {details.poster_path ? (
                        <img
                          src={`${img_300}${details.poster_path}`}
                          alt={details.id}
                          height="100px"
                        />
                      ) : (
                        <img src={noPicture} alt={details.id} height="100px" />
                      )}
                      <div className="job_description">
                        <p>
                          <b>
                            {details.original_title
                              ? details.original_title
                              : details.original_name}
                          </b>
                        </p>
                        {details.character && (
                          <p className="character">as {details.character}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}

            {movieList?.crew?.length > 0 && (
              <>
                <h4>Crew({movieList?.crew?.length})</h4>
                <div className="movie_details">
                  {movieList?.crew?.map((details, index) => (
                    <div
                      className="each_cinema_details"
                      key={index}
                      onClick={() =>
                        history.push(
                          `/search/${details.id}/${
                            actorCategory === "movie_credits" ? "movie" : "tv"
                          }`
                        )
                      }
                    >
                      <div className="year">
                        {details.release_date?.slice(0, 4)}
                      </div>
                      {details.poster_path ? (
                        <img
                          src={`${img_300}${details.poster_path}`}
                          alt={details.id}
                          height="100px"
                        />
                      ) : (
                        <img src={noPicture} alt={details.id} height="100px" />
                      )}
                      <div className="job_description">
                        <p>
                          <b>{details.original_title}</b>
                        </p>
                        <>
                          {details.job && (
                            <p className="character">as {details.job}</p>
                          )}
                        </>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CelebrityFullDetails;
