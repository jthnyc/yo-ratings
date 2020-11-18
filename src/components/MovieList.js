import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import MovieDetail from "../components/MovieDetail";

const MovieList = () => {
  const { title, searchResult } = useContext(AppContext);
  return (
    <div>
      {title ? (
        <div>
          <h5>
            Results for <em>"{title}"</em>
          </h5>
          <div>
            <ul>
              {searchResult.map((movie) => {
                return (
                  <MovieDetail
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    id={movie.imdbID}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <h5>No result</h5>
        </div>
      )}
    </div>
  );
};

export default MovieList;
