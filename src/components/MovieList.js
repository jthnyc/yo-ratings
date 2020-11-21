import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";

const MovieList = () => {
  const {
    title,
    searchResult,
    onOpenDetail,
    onUpVote,
    onDownVote,
  } = useContext(AppContext);
  //   console.log("selected in MOVIELIST: ", selected);
  return (
    <MovieContainer>
      {title ? (
        <MovieListContainer>
          <SearchQuery>
            Results for <em>"{title}"</em>
          </SearchQuery>
          <div>
            <MovieListWrapper>
              {searchResult.map((movie) => {
                return (
                  <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    id={movie.imdbID}
                    onOpenDetail={onOpenDetail}
                    onUpVote={onUpVote}
                    onDownVote={onDownVote}
                  />
                );
              })}
            </MovieListWrapper>
          </div>
        </MovieListContainer>
      ) : (
        <MovieListContainer>
          <h5>No result</h5>
        </MovieListContainer>
      )}
    </MovieContainer>
  );
};

export default MovieList;

const MovieContainer = styled.div`
  border: 1px solid black;
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
  //   border: 1px solid green;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-auto-rows: minmax(20rem, auto);
  max-width: 1440px;
  padding: 0;
`;
