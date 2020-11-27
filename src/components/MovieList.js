import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

const MovieList = () => {
  const { title, listSearchResult } = useContext(AppContext);
  // console.log("movie list: ", listSearchResult);

  return (
    <MovieContainer>
      {title ? (
        <MovieListContainer>
          <SearchQuery>
            Results for <em>"{title}"</em>
          </SearchQuery>
          <div>
            <MovieListWrapper>
              {listSearchResult.map((movie) => {
                return (
                  <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    id={movie.imdbID}
                    up={movie.up}
                    down={movie.down}
                    flipped={movie.flipped}
                  />
                );
              })}
            </MovieListWrapper>
          </div>
        </MovieListContainer>
      ) : (
        <MovieListContainer>
          <SearchQuery>Search for some movies!</SearchQuery>
        </MovieListContainer>
      )}
    </MovieContainer>
  );
};

export default MovieList;

const MovieContainer = styled.div`
  // border: 1px solid black;
  border-style: none;
  margin: 2em 2em;
  padding: 2em 2em;
  background-color: var(--dark-blue);
  border-radius: 0.5em;
  box-shadow: 0 0 10px var(--light-blue);
  min-height: 100vh;
  box-shadow: 0 0 10px var(--teal-green);
  color: var(--light-green);
`;

const MovieListContainer = styled.div`
  // border: 1px solid red;
`;

const SearchQuery = styled.h5`
  font-size: 20px;
  font-weight: bold;
`;

const MovieListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: minmax(20rem, 1fr);
  padding: 0;
`;
