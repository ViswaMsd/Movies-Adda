import React from "react";

const TopContainer = () => {
  return (
    <>
      {content.original_title && (
        <div id="top">
          <div className="left_box">
            <img src={poster_back} alt="" />
          </div>
          <div className="right_box">
            <div className="heading">
              <h1>
                {content.title} ({new Date(content.release_date).getFullYear()})
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
              {content.runtime && (
                <div className="genres">
                  <div className="dot"></div>
                  {`${hours}hrs ${minutes}min`}
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
                {unique.map((data) => (
                  <div className="crew_data" key={data}>
                    <b>{data}</b>
                    {dataItem.map((work) => (
                      <p key={work.credit_id}>
                        {work.name === data && work.job}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TopContainer;
