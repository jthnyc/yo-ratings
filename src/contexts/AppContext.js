import { createContext, useState, useEffect } from "react";
import Axios from "axios";
import useStickyState from "@nicer-toolbox/use-sticky-state";

export const AppContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const AppContextProvider = (props) => {
  // const [listSearchResult, setListSearchResult] = useState(() => {
  //   const savedMovies = localStorage.getItem("movieList");
  //   return savedMovies ? JSON.parse(savedMovies) : [];
  // });
  const [listSearchResult, setListSearchResult] = useStickyState(
    [],
    "movieList"
  );
  const [title, setTitle] = useStickyState("", "query");
  const [listSearchUrl, setListSearchUrl] = useState(API_URL);
  const [selectedSearchUrl, setSelectedSearchUrl] = useState(API_URL);
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState({});
  const [votedArr, setVotedArr] = useStickyState([], "votedList");

  /*
  const savedSearch = localStorage.getItem("query");
  const query = savedSearch.slice(1, savedSearch.length - 1);
  console.log("Query is: ", query, title);

  const savedMovies = localStorage.getItem("movieList");
  console.log("saved movies: ", savedMovies);
  const parsedMovies = JSON.parse(savedMovies);
  console.log("parsed movies: ", parsedMovies);
  let newParsedMovies = [];
  newParsedMovies =
    parsedMovies !== null
      ? parsedMovies.forEach((movieObj) => newParsedMovies.push(movieObj))
      : [];
  console.log("List to push to effect ", newParsedMovies);
  */

  // fetching first time using s parameter for movie list search
  useEffect(() => {
    // IF THE SEARCH TERM IS THE SAME as what was stored before
    // if the query data already exists, access localStorage instead of API call
    // what's the check? so far thinking that the query is existing in query history
    // if there is, then set listSearchResult with the saved localStorage
    // if (savedMovies.length !== 0) {
    //   console.log("IN IF");

    // console.log("PARSED MOVIES: IN EFFECT: ", parsedMovies);
    // if (title === query) {
    //   console.log("IN IF");
    // if (
    //   newParsedMovies !== undefined &&
    //   listSearchUrl.includes(query.slice(1, query.length - 1))
    // ){
    //   console.log("in if");
    // setListSearchResult(newParsedMovies);
    // } else {
    const fetchList = async () => {
      const response = await Axios(listSearchUrl);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      setListSearchResult(uniqueMovies);
    };
    fetchList();
    // }
  }, [listSearchUrl]);

  // fetching second time using i parameter for movie imdbID search
  useEffect(() => {
    if (selectedSearchUrl.includes("i=")) {
      const fetchData = async () => {
        const response = await Axios(selectedSearchUrl);
        const selectedMovie = response.data || {};
        // console.log("selected movie: ", selectedMovie);
        setSelected([...selected, selectedMovie]);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearchUrl]);

  // search result can sometimes return duplicates, sorting by year as well
  const filterUniqueMovies = (movieArr) => {
    let uniqueMovieIDs = new Set(movieArr.map((movie) => movie.imdbID));
    let uniqueMovies = [];
    uniqueMovieIDs.forEach((id) =>
      uniqueMovies.push(movieArr.find((movie) => movie.imdbID === id))
    );
    uniqueMovies.sort((a, b) => a.Year - b.Year);
    return uniqueMovies;
  };

  // const checkVotedArr = (voteArr, movieList) => {
  //   let toCheckObj = votedArr.length !== 0 ? voteArr[0] : {};
  //   // check if votedarr is not empty, and if listSearchResult contains that object
  //   for (let movie of movieList) {
  //     if (movie === toCheckObj) {
  //       console.log("match === ", movie);
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const handleFlip = (id) => {
    setSelectedSearchUrl(API_URL + `&i=${id}`);
    const flippedMovieToAdd = listSearchResult.find(
      (movie) => movie.imdbID === id
    );
    if (flippedMovieToAdd) {
      flippedMovieToAdd.flipped
        ? (flippedMovieToAdd.flipped = !flippedMovieToAdd.flipped)
        : (flippedMovieToAdd.flipped = true);
      const updatedList = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === flippedMovieToAdd.imdbID
          ? updatedList.push(flippedMovieToAdd)
          : updatedList.push(movie)
      );
      setListSearchResult([...updatedList]);
    }
  };

  const handleUpCount = (id) => {
    const clickedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    // check if movie already has down vote, disable up vote

    let inVotedArr = votedArr.find((movie) => movie.imdbID === id);
    inVotedArr
      ? (votedArr.up += 1)
      : setVotedArr([...votedArr, { ...clickedMovie, up: 1 }]);

    const selectedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    // console.log("UP selected === ", selectedMovie);
    let obj = {};
    if (selectedMovie.up) {
    } else {
      if (selectedMovie) {
        // eslint-disable-next-line no-unused-expressions
        selectedMovie.up
          ? ((selectedMovie.up += 1),
            (obj[id] = { up: true, down: false }),
            setDisabled({ ...disabled, obj }))
          : ((selectedMovie.up = 1),
            (obj[id] = { up: false, down: true }),
            setDisabled({ ...disabled, obj }));
        const newResult = [];
        listSearchResult.forEach((movie) =>
          movie.imdbID === selectedMovie
            ? newResult.push(selectedMovie)
            : newResult.push(movie)
        );
        setListSearchResult([...newResult]);
      }
    }
  };

  const handleDownCount = (id) => {
    const clickedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    // check if clicked movie already has one vote on up, then disable down
    const inVotedArr = votedArr.find((movie) => movie.imdbID === id);
    inVotedArr
      ? votedArr.down
        ? (inVotedArr.down += 1)
        : (inVotedArr.down = 1)
      : setVotedArr([...votedArr, { ...clickedMovie, down: 1 }]);

    const selected = listSearchResult.find((movie) => movie.imdbID === id);
    // console.log("DOWN selected ===  ", selected);
    if (selected) {
      selected.down ? (selected.down += 1) : (selected.down = 1);
      const newResult = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === selected
          ? newResult.push(selected)
          : newResult.push(movie)
      );
      setListSearchResult([...newResult]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        listSearchResult,
        title,
        setTitle,
        setListSearchUrl,
        API_URL,
        selected,
        disabled,
        handleFlip: handleFlip,
        handleUpCount: handleUpCount,
        handleDownCount: handleDownCount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
