import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "style-it";
import { useHistory } from "react-router-dom";
import {
  FaYoutube,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
} from "react-icons/fa";
import { BiLinkAlt } from "react-icons/bi";
import VideoModal from "./VedioModal";

const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";
const img_300 = "https://image.tmdb.org/t/p/w300";
const img_500 = "https://image.tmdb.org/t/p/w500";
const noPicture =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MovieDetails = ({ movieId, mediaCategory }) => {
  const [content, setContent] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [externalLinks, setExternalLinks] = useState([]);
  const [video, setVideo] = useState();
  const [shown, setShown] = React.useState(false);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [media, setMedia] = useState([]);
  const [mediaState, setMediaState] = useState({
    media: true,
    colorOne: "#fff",
    colorTwo: "#4a5fd4",
  });

  const history = useHistory();

  const fetchMovieDetails = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US`
    );
    setContent(data);
  };
  useEffect(() => {
    fetchMovieDetails();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [movieId]);

  const fetchMovieCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}/credits?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US`
    );
    setMovieCredits(data);
  };
  useEffect(() => {
    fetchMovieCredits();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [movieId]);

  const fetchExternalLinks = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}/external_ids?api_key=887a6e58ff55501bcfdc69a8db52ba7f`
    );
    setExternalLinks(data);
  };
  useEffect(() => {
    fetchExternalLinks();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [movieId]);

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}/videos?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchVideo();
    // eslint-disable-next-line
  }, [movieId]);

  const MovieReviews = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}/reviews?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US&page=1`
    );

    setReviews(data);
  };

  useEffect(() => {
    MovieReviews();
    // eslint-disable-next-line
  }, [movieId]);

  const MovieRecommendations = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}/recommendations?api_key=887a6e58ff55501bcfdc69a8db52ba7f&language=en-US&page=1`
    );

    setRecommendations(data);
  };

  useEffect(() => {
    MovieRecommendations();
    // eslint-disable-next-line
  }, [movieId]);

  const mediaData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaCategory}/${movieId}/images?api_key=887a6e58ff55501bcfdc69a8db52ba7f&page=1`
    );

    setMedia(data);
  };

  useEffect(() => {
    mediaData();
    // eslint-disable-next-line
  }, [movieId]);

  let dataItem = [];
  movieCredits?.crew?.map((dir) =>
    dir.department === "Writing"
      ? dataItem.push(dir)
      : dir.department === "Directing" && dataItem.push(dir)
  );

  // const poster_back = img_300 + content.poster_path;
  var hours = Math.floor(content.runtime / 60);
  var minutes = content.runtime % 60;

  let key = "name";
  const arrayUniqueByKey = [
    ...new Map(dataItem.map((item) => [item[key], item])).values(),
  ];

  let budget = content?.budget?.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  let revenue = content?.revenue?.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  let RatingNumber = content?.vote_average?.toString().split(".").join("");
  let Rating = `${
    RatingNumber?.length > 1 ? RatingNumber : RatingNumber + "0"
  },100`;

  const changeMedia = () => {
    setMediaState({
      media: !mediaState.media,
      colorOne: mediaState.colorTwo,
      colorTwo: mediaState.colorOne,
    });
  };

  return Style.it(
    `#top {
        position: relative;
        width: 100%;
        display: flex;
        z-index:1;
        flex-wrap:wrap;
      }
      #top::after{
        content: "";
        background-image: url(${
          content?.backdrop_path && img_500 + content?.backdrop_path
        });
        background-size: cover;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.6;
        z-index:-1;
      }
    `,
    <div className="movie_details">
      <div id="top">
        {content.poster_path && (
          <div className="left_box">
            <img src={`${img_300}${content.poster_path}`} alt="" />
          </div>
        )}

        <div className="right_box">
          <div className="heading">
            <h1>
              {content.title ? content.title : content.name} (
              {content.release_date
                ? new Date(content.release_date).getFullYear()
                : new Date(content.first_air_date).getFullYear()}
              )
            </h1>
          </div>
          <div className="overview_data">
            <div className="ua">UA</div>
            {content.release_date
              ? new Date(content.release_date).getDate() +
                " " +
                months[new Date(content.release_date).getMonth()] +
                " " +
                new Date(content.release_date).getFullYear()
              : new Date(content.first_air_date).getDate() +
                " " +
                months[new Date(content.first_air_date).getMonth()] +
                " " +
                new Date(content.first_air_date).getFullYear()}

            {content.genres && (
              <div className="genres">
                <div className="dot"></div>
                {content?.genres?.map((genre) => (
                  <b key={genre.id}> {genre.name}</b>
                ))}
              </div>
            )}
            {content.runtime !== 0 && mediaCategory !== "tv" && (
              <div className="genres">
                <div className="dot"></div>
                {`${hours}hrs ${minutes}min`}
              </div>
            )}
          </div>

          <div className="flex-wrapper">
            {content.vote_average !== 0 && (
              <>
                <div className="single-chart">
                  <svg viewBox="0 0 36 36" className="circular-chart blue">
                    <path
                      className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle"
                      strokeDasharray={Rating}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {RatingNumber?.length > 1
                        ? RatingNumber
                        : RatingNumber + "0"}
                      %
                    </text>
                  </svg>
                </div>
                <h1>User Score</h1>
              </>
            )}
            {video && (
              <div className="trailer" onClick={() => setShown(!shown)}>
                <FaYoutube size="40" color="#FF0000" />
                <b>Watch Trailer</b>
                {shown ? (
                  <VideoModal
                    src={`https://www.youtube.com/embed/${video}`}
                    setShown={setShown}
                  />
                ) : null}
              </div>
            )}
          </div>

          {content.overview && (
            <div className="overview">
              <h1>Overview</h1>
              <p>{content.overview}</p>
            </div>
          )}
          {movieCredits.crew && (
            <div className="crew">
              {arrayUniqueByKey.map((data) => (
                <div className="crew_data" key={data.name}>
                  <b
                    onClick={() => history.push(`/search/${data.id}/person`)}
                    style={{ cursor: "pointer" }}
                  >
                    {data.name}
                  </b>
                  {dataItem.map((work) => (
                    <p key={work.credit_id}>
                      {work.name === data.name && work.job}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="middle_container">
        {movieCredits?.cast?.length > 0 && (
          <div className="movie_list_container">
            <h4>Top Billed Cast</h4>
            <div className="movie_list">
              {movieCredits?.cast?.slice(0, 9).map((cast) => (
                <div
                  className="movie"
                  key={cast.id}
                  onClick={() => history.push(`/search/${cast.id}/person`)}
                >
                  {cast.profile_path ? (
                    <img
                      src={`${img_300}${cast.profile_path}`}
                      alt={cast.name}
                      title={cast.name}
                    />
                  ) : (
                    <img src={noPicture} alt={cast.name} />
                  )}
                  <p>{cast.name}</p>
                </div>
              ))}
              <div className="more_details">
                <h4>Load..More..</h4>
              </div>
            </div>
            <div className="full_cast">View Full Cast & Crew</div>
            {reviews?.results?.length > 0 && (
              <div className="reviews">
                <div className="review_header">
                  <h1>
                    <b>Social</b>
                  </h1>
                  <p>Reviews({reviews?.results?.length})</p>
                </div>
                {reviews.results.map((review) => (
                  <div className="review_box" key={review.id}>
                    <div className="left">
                      <div className="profile">{review?.author[0]}</div>
                      <div className="rating">6</div>
                    </div>
                    <div className="right">
                      <div className="author_header">
                        <h1>A review by {review.author}</h1>
                        <p>
                          Written by{" "}
                          <b>
                            {" "}
                            <a
                              href={review.url}
                              target="_self"
                              rel="noopener noreferrer"
                            >
                              {review.author}
                            </a>
                          </b>{" "}
                          on &nbsp;&nbsp;
                          {review.created_at &&
                            new Date(review.created_at).getDate() +
                              " " +
                              months[new Date(review.created_at).getMonth()] +
                              " " +
                              new Date(review.created_at).getFullYear()}
                        </p>
                      </div>
                      <div className="review_details">
                        {review.content.substring(0, 350) + "..."}
                        <a href={review.url}>view more</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="right_list">
          {externalLinks && (
            <div className="external_links">
              {externalLinks.facebook_id && (
                <a
                  href={`https://www.facebook.com/${externalLinks.facebook_id}`}
                  target="_blank"
                  rel="noreferrer"
                  title="facebook Page"
                >
                  <FaFacebookSquare size="40" color="#4267B2" />
                </a>
              )}
              {externalLinks.twitter_id && (
                <a
                  href={`https://twitter.com/${externalLinks.twitter_id}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Twitter Page"
                >
                  <FaTwitterSquare size="40" color="#1DA1F2" />
                </a>
              )}
              {externalLinks.instagram_id && (
                <a
                  href={`https://instagram.com/${externalLinks.instagram_id}`}
                  target="_blank"
                  rel="noreferrer"
                  title="InstaGram Page"
                >
                  <FaInstagram size="40" color="#8a3ab9" />
                </a>
              )}
              {content.homepage && (
                <div className="homepage_link">
                  {externalLinks.facebook_id ? (
                    <div className="line"></div>
                  ) : externalLinks.twitter_id ? (
                    <div className="line"></div>
                  ) : (
                    externalLinks.facebook_id && <div className="line"></div>
                  )}
                  <a
                    href={`${content.homepage}`}
                    target="_blank"
                    rel="noreferrer"
                    title="Home Page"
                    style={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BiLinkAlt size="40" color="grey" />
                    <h4
                      style={{
                        display: "inline-block",
                        alignSelf: "center",
                        textAlign: "center",
                        color: "grey",
                      }}
                    >
                      {!externalLinks.twitter_id &&
                        !externalLinks.instagram_id &&
                        "Home Page"}
                    </h4>
                  </a>
                </div>
              )}
            </div>
          )}
          {content.status && (
            <div className="simple_block">
              <h1>Status</h1>
              <p>{content.status}</p>
            </div>
          )}
          {content.original_language && (
            <div className="simple_block">
              <h1>Original Language</h1>
              <p>
                {content.spoken_languages &&
                  content.spoken_languages.map(
                    (lang) =>
                      lang.iso_639_1 === content.original_language &&
                      lang.english_name
                  )}
              </p>
            </div>
          )}
          {content?.budget !== 0 && mediaCategory !== "tv" && (
            <div className="simple_block">
              <h1>Budget</h1>
              <p>
                {budget?.length === 15
                  ? budget?.slice(0, 2) + " Cr"
                  : budget?.length > 15
                  ? budget?.slice(0, 3) + " Cr"
                  : budget + " Lakhs"}
              </p>
            </div>
          )}
          {content?.revenue !== 0 && mediaCategory !== "tv" && (
            <div className="simple_block">
              <h1>Revenue</h1>
              <p>
                {revenue?.length === 15
                  ? revenue?.slice(0, 2) + " Cr"
                  : revenue?.length > 15
                  ? revenue?.slice(0, 3) + " Cr"
                  : revenue + " Lakhs"}
              </p>
            </div>
          )}
        </div>
      </div>
      {media?.posters?.length > 0 && (
        <div className="recommendations">
          <div className="Recommendations_header">
            <h1>
              <b>Media</b>
            </h1>
            <b
              style={{ color: `${mediaState.colorTwo}` }}
              onClick={changeMedia}
            >
              Backdrops({media?.backdrops?.length})
            </b>
            <b
              style={{ color: `${mediaState.colorOne}` }}
              onClick={changeMedia}
            >
              Posters({media?.posters?.length})
            </b>
          </div>
          <div className="media_container_box">
            {mediaState.media ? (
              <>
                {media?.backdrops?.map((rec) => (
                  <div className="recommendations_media" key={rec.file_path}>
                    <a href={`${img_500}${rec?.file_path}`} target="_self">
                      <img
                        src={
                          rec?.file_path
                            ? `${img_500}${rec?.file_path}`
                            : noPicture
                        }
                        alt={rec.file_path}
                      />
                    </a>
                  </div>
                ))}
              </>
            ) : (
              <>
                {media?.posters?.map((rec) => (
                  <div className="recommendations_media" key={rec.file_path}>
                    <a href={`${img_500}${rec?.file_path}`} target="_self">
                      <img
                        src={
                          rec?.file_path
                            ? `${img_300}${rec?.file_path}`
                            : unavailableLandscape
                        }
                        alt={rec.file_path}
                        className="poster_img"
                      />
                    </a>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {recommendations?.results?.length > 0 && (
        <div className="recommendations">
          <div className="Recommendations_header">
            <h1>
              <b>Recommendations</b>
            </h1>
          </div>
          <div className="media_container_box">
            {recommendations?.results?.map((rec) => (
              <div
                className="recommendations_media"
                key={rec.id}
                onClick={() =>
                  history.push(`/search/${rec.id}/${mediaCategory}`)
                }
              >
                <img
                  src={
                    rec?.backdrop_path
                      ? `${img_500}${rec?.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={rec.original_title ? rec.original_title : rec.name}
                />
                <div className="details">
                  <span>
                    <b>{rec.original_title ? rec.original_title : rec.name}</b>
                  </span>
                  <div className="rating">
                    {rec.vote_average?.toString()?.substring(0, 3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
