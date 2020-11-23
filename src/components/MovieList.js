import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

const MovieList = () => {
  const { title, listSearchResult, selected } = useContext(AppContext);
  // console.log("search Result in movie List: ", searchResult);
  console.log("SELECTEED IN LIST: === ", selected);
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
                    director={selected.Director}
                    plot={selected.Plot}
                  />
                );
              })}
            </MovieListWrapper>
          </div>
        </MovieListContainer>
      ) : (
        <MovieListContainer>
          <SearchQuery>No result</SearchQuery>
        </MovieListContainer>
      )}
    </MovieContainer>
  );
};

export default MovieList;

const MovieContainer = styled.div`
  border: 1px solid black;
  border-style: none;
  margin: 2em 2em;
  padding: 2em 2em;
  background-color: #6290c3;
  border-radius: 0.5em;
  box-shadow: 0 0 10px #6290c3;
`;

const MovieListContainer = styled.div`
  //   border: 1px solid red;
`;

const SearchQuery = styled.h5`
  font-size: 20px;
  font-weight: bold;
`;

const MovieListWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: minmax(20rem, auto);
  padding: 0;
`;
