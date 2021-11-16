import React from "react";
import { useHistory } from "react-router-dom";

const img_300 = "https://image.tmdb.org/t/p/w300";
export const noPicture =
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

const SingleItem = ({ data, SearchCategory, MediaType }) => {
  const history = useHistory();
  let mediaCategory = data.media_type ? data.media_type : MediaType;
  return (
    <>
      <div
        className="data_container"
        onClick={() => history.push(`/search/${data.id}/${mediaCategory}`)}
      >
        {data.poster_path || data.profile_path ? (
          <img
            src={`${img_300}${
              data.poster_path ? data.poster_path : data.profile_path
            }`}
            alt={data.title ? data.title : data.original_name}
            width="180px"
          />
        ) : (
          <img
            src={noPicture}
            alt={data.title ? data.title : data.original_name}
            width="180px"
          />
        )}
        {data.vote_average > 0 && (
          <div
            className="rating"
            style={{
              backgroundColor: data.vote_average > 6 ? "#4a5fd4" : "#a00000",
            }}
          >
            {data.vote_average}
          </div>
        )}

        <p>{data.original_title ? data.original_title : data.name}</p>
        {SearchCategory !== "person" && data.media_type !== "person" && (
          <p>
            (
            {data.release_date
              ? new Date(data.release_date).getDate() +
                " " +
                months[new Date(data.release_date).getMonth()] +
                " " +
                new Date(data.release_date).getFullYear()
              : new Date(data.first_air_date).getDate() +
                " " +
                months[new Date(data.first_air_date).getMonth()] +
                " " +
                new Date(data.first_air_date).getFullYear()}
            )
          </p>
        )}
      </div>
    </>
  );
};

export default SingleItem;
