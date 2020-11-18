import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";

const MovieList = () => {
  const { title, searchResult, onOpenDetail, selected } = useContext(
    AppContext
  );
  //   console.log("selected in MOVIELIST: ", selected);
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
                  <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    id={movie.imdbID}
                    onOpenDetail={onOpenDetail}
                    selected={selected}
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
